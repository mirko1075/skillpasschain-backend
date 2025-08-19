export function sanitizeJson(raw: string): any[] {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: extract substring between first "[" and last "]"
    const match = raw.match(/\[.*\]/s);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        console.error("Failed to parse extracted JSON:", err);
        return [];
      }
    }
    console.error("No valid JSON found in AI response");
    return [];
  }
}
export function sanitizeJsonArray(raw: string): any[] {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: extract substring between first "[" and last "]"
    const match = raw.match(/\[.*\]/s);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        console.error("Failed to parse extracted JSON array:", err);
        return [];
      }
    }
    console.error("No valid JSON array found in AI response");
    return [];
  }
}
export function sanitizeJsonObject(raw: string): Record<string, any> {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: extract substring between first "{" and last "}"
    const match = raw.match(/\{.*\}/s);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        console.error("Failed to parse extracted JSON object:", err);
        return {};
      }
    }
    console.error("No valid JSON object found in AI response");
    return {};
  }
}
export function sanitizeJsonString(raw: string): string {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: extract substring between first '"' and last '"'
    const match = raw.match(/"(.*?)"/s);
    if (match) {
      return match[1];
    }
    console.error("No valid JSON string found in AI response");
    return '';
  }
}
export function sanitizeJsonNumber(raw: string): number {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: extract substring that looks like a number
    const match = raw.match(/-?\d+(\.\d+)?/);
    if (match) {
      return parseFloat(match[0]);
    }
    console.error("No valid JSON number found in AI response");
    return 0;
  }
}
export function sanitizeJsonBoolean(raw: string): boolean {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: check for true/false strings
    if (raw.toLowerCase() === 'true') return true;
    if (raw.toLowerCase() === 'false') return false;
    console.error("No valid JSON boolean found in AI response");
    return false;
  }
}
export function sanitizeJsonNull(raw: string): null {
  try {
    // Direct parse attempt first
    return JSON.parse(raw);
  } catch {
    // Fallback: check for null string
    if (raw.toLowerCase() === 'null') return null;
    console.error("No valid JSON null found in AI response");
    return null;
  }
}
export function sanitizeJsonDate(raw: string): Date {
  try {
    // Direct parse attempt first
    return new Date(JSON.parse(raw));
  } catch {
    // Fallback: extract substring that looks like a date
    const match = raw.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z|\d{4}-\d{2}-\d{2})/);
    if (match) {
      return new Date(match[0]);
    }
    console.error("No valid JSON date found in AI response");
    return new Date(0); // Return epoch date if no valid date found
  }
}
export function sanitizeJsonRegex(raw: string): RegExp {
  try {
    // Direct parse attempt first
    return new RegExp(JSON.parse(raw));
  } catch {
    // Fallback: extract substring that looks like a regex pattern
    const match = raw.match(/\/(.*?)\/[gimuy]*/);
    if (match) {
      return new RegExp(match[1]);
    }
    console.error("No valid JSON regex found in AI response");
    return /./; // Return a default regex that matches any character
  }
}