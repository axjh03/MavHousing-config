export function validatePasswordSec(
    password: string,
    fname?: string,
    lname?: string,
    mname?: string,
    email?: string
  ): boolean {
    if (!password) return false;
  
    if (password.length < 10) return false;
  
    // Complexity checks
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(password);
    if (!(hasUpper && hasLower && hasNumber && hasSpecial)) return false;
  
    // Check for personal info (case-insensitive)
    const lowerPass = password.toLowerCase();
    const forbiddenParts = [fname, lname, mname]
      .filter((s): s is string => !!s)
      .map(s => s.toLowerCase());
    if (email) {
      const emailParts = email.split(/[@._-]/).map(e => e.toLowerCase());
      forbiddenParts.push(...emailParts);
    }
  
    for (const word of forbiddenParts) {
      if (word && lowerPass.includes(word)) return false;
    }
    
    // returns if all validated
    return true;
  }
  