import { PrismaClient } from '../generated/prisma';
import { mockUsers } from '../mock_db/mockUsers';
import { mockProperties } from '../mock_db/mockProperties';
import { mockUnits } from '../mock_db/mockUnits';
import { mockRooms } from '../mock_db/mockRooms';
import { mockBeds } from '../mock_db/mockBeds';
import { mockApplications } from '../mock_db/mockLeasing';
import { mockLeases } from '../mock_db/mockLeasing';
import { mockOccupants } from '../mock_db/mockLeasing';
import { mockPayments } from '../mock_db/mockLeasing';
import { mockMaintenanceRequests } from '../mock_db/mockLeasing';
import * as bcrypt from 'bcryptjs';

import 'dotenv/config';

const prisma = new PrismaClient({});

async function main() {
  console.log('🌱 Starting comprehensive database seed...\n');

  try {
    console.log('Clearing existing data and resetting sequences...');
    const tablenames = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    if (tables.length > 0) {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`,
      );
    }
    console.log('Database cleared\n');

    // 1. Create Properties
    console.log('Creating properties...');
    const properties: any[] = [];
    for (const prop of mockProperties) {
      const created = await prisma.property.create({ data: prop });
      properties.push(created);
    }
    console.log(`Created ${properties.length} properties`);
    properties.forEach((prop) =>
      console.log(`      - ${prop.name} (${prop.leaseType})`),
    );
    console.log();

    // 2. Create Users
    console.log('Creating users...');
    const users: any[] = [];
    for (const user of mockUsers) {
      const hashedPassword = await bcrypt.hash(user.passwordHash, 10);
      const created = await prisma.user.create({
        data: {
          ...user,
          passwordHash: hashedPassword,
        },
      });
      users.push(created);
    }
    console.log(`Created ${users.length} users\n`);

    // 3. Create Units
    console.log('Creating units...');
    const units: any[] = [];
    for (const unit of mockUnits) {
      const created = await prisma.unit.create({ data: unit });
      units.push(created);
    }
    console.log(`Created ${units.length} units\n`);

    // 4. Create Rooms (only for BY_ROOM and BY_BED properties)
    console.log('Creating rooms...');
    const rooms: any[] = [];
    for (const room of mockRooms) {
      const created = await prisma.room.create({ data: room });
      rooms.push(created);
    }
    console.log(`Created ${rooms.length} rooms\n`);

    // 5. Create Beds (only for BY_BED properties)
    console.log('🛏️  Creating beds...');
    const beds: any[] = [];
    for (const bed of mockBeds) {
      const { unitId, ...bedData } = bed as any;
      const created = await prisma.bed.create({ data: bedData });
      beds.push(created);
    }
    console.log(`Created ${beds.length} beds\n`);

    // 6. Create Applications
    console.log('Creating applications...');
    const applications: any[] = [];
    for (const app of mockApplications) {
      const created = await prisma.application.create({ data: app });
      applications.push(created);
    }
    console.log(`Created ${applications.length} applications`);
    console.log('Status breakdown:');
    console.log(
      `      - SUBMITTED: ${applications.filter((a) => a.status === 'SUBMITTED').length}`,
    );
    console.log(
      `      - APPROVED: ${applications.filter((a) => a.status === 'APPROVED').length}`,
    );
    console.log(
      `      - UNDER_REVIEW: ${applications.filter((a) => a.status === 'UNDER_REVIEW').length}\n`,
    );

    // 7. Create Leases
    console.log('Creating leases...');
    const leases: any[] = [];
    for (const lease of mockLeases) {
      const created = await prisma.lease.create({ data: lease });
      leases.push(created);
    }
    console.log(`Created ${leases.length} leases`);
    console.log('Lease type breakdown:');
    console.log(
      `      - BY_UNIT: ${leases.filter((l) => l.leaseType === 'BY_UNIT').length} (no rooms/beds)`,
    );
    console.log(
      `      - BY_ROOM: ${leases.filter((l) => l.leaseType === 'BY_ROOM').length} (rooms only)`,
    );
    console.log(
      `      - BY_BED: ${leases.filter((l) => l.leaseType === 'BY_BED').length} (rooms + beds)\n`,
    );

    // 8. Create Occupants
    console.log('Creating occupants...');
    const occupants: any[] = [];
    for (const occupant of mockOccupants) {
      const created = await prisma.occupant.create({ data: occupant });
      occupants.push(created);
    }
    console.log(`Created ${occupants.length} occupants`);
    console.log('Occupant type breakdown:');
    console.log(
      `      - LEASE_HOLDER: ${occupants.filter((o) => o.occupantType === 'LEASE_HOLDER').length}`,
    );
    console.log(
      `      - OCCUPANT: ${occupants.filter((o) => o.occupantType === 'OCCUPANT').length}\n`,
    );

    // 9. Create Payments
    console.log('Creating payments...');
    const payments: any[] = [];
    for (const payment of mockPayments) {
      const created = await prisma.payment.create({ data: payment });
      payments.push(created);
    }
    console.log(`Created ${payments.length} payments`);
    const totalPaid = payments.reduce(
      (sum, p) => sum + Number(p.amountPaid),
      0,
    );
    console.log(`      Total revenue: $${totalPaid.toFixed(2)}\n`);

    // 10. Create Maintenance Requests
    console.log('Creating maintenance requests...');
    const maintenance: any[] = [];
    for (const req of mockMaintenanceRequests) {
      const created = await prisma.maintenanceRequest.create({ data: req });
      maintenance.push(created);
    }
    console.log(`Created ${maintenance.length} maintenance requests`);
    console.log('Status breakdown:');
    console.log(
      `      - OPEN: ${maintenance.filter((m) => m.status === 'OPEN').length}`,
    );
    console.log(
      `      - IN_PROGRESS: ${maintenance.filter((m) => m.status === 'IN_PROGRESS').length}`,
    );
    console.log(
      `      - RESOLVED: ${maintenance.filter((m) => m.status === 'RESOLVED').length}`,
    );
    console.log('      Category breakdown:');
    console.log(
      `      - PLUMBING: ${maintenance.filter((m) => m.category === 'PLUMBING').length}`,
    );
    console.log(
      `      - HVAC: ${maintenance.filter((m) => m.category === 'HVAC').length}`,
    );
    console.log(
      `      - INTERNET: ${maintenance.filter((m) => m.category === 'INTERNET').length}`,
    );
    console.log(
      `      - APPLIANCE: ${maintenance.filter((m) => m.category === 'APPLIANCE').length}`,
    );
    console.log(
      `      - ELECTRICAL: ${maintenance.filter((m) => m.category === 'ELECTRICAL').length}`,
    );
    console.log(
      `      - STRUCTURAL: ${maintenance.filter((m) => m.category === 'STRUCTURAL').length}\n`,
    );

    console.log('Database seeding completed successfully!');
    console.log('\nSUMMARY:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Properties: ${properties.length}`);
    console.log(`   Units: ${units.length}`);
    console.log(`   Rooms: ${rooms.length} (BY_ROOM & BY_BED properties only)`);
    console.log(`   Beds: ${beds.length} (BY_BED properties only)`);
    console.log(`   Applications: ${applications.length}`);
    console.log(`   Leases: ${leases.length}`);
    console.log(`   Occupants: ${occupants.length}`);
    console.log(`   Payments: ${payments.length}`);
    console.log(`   Maintenance Requests: ${maintenance.length}`);
    console.log('\nReady to go! Try: npx prisma studio');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
