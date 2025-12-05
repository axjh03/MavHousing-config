import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { InternalApiService } from './internal-api.service';
import { InternalApiResolver } from './internal-api.resolver';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthServerModule } from 'apps/auth-server/src/auth-server.module';
import { CommsServerModule } from 'apps/comms-server/src/comms-server.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true, // required to generate schema in code-first
    }),
    // TypeORM root configuration — reads from env with sensible defaults for local dev
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST ?? 'localhost',
    //   port: Number(process.env.POSTGRES_PORT) || 5432,
    //   username: process.env.POSTGRES_USER ?? 'postgres',
    //   password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    //   database: process.env.POSTGRES_DB ?? 'mavhousing',
    //   entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
    //   synchronize: true,
    // }),
    AuthServerModule,
    CommsServerModule,
  ],
  providers: [InternalApiService, InternalApiResolver],
})
export class InternalApiModule {}
