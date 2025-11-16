const isPrimitive = (value: any): boolean => {
    if (value === null) return true;
    const type = typeof value;
    return type === 'string' || type === 'number' || type === 'boolean';
};

const formatSimpleValue = (value: any): string => {
  if (value === null) return 'null';
  const type = typeof value;
  if (type === 'string') {
    const needsQuotes =
      value === '' ||
      /^(true|false|null)$/.test(value) ||
      /^-?\d+(\.\d+)?$/.test(value) ||
      /^\s|\s$/.test(value) ||
      /[:[\]{}#,\-"]/.test(value) ||
      /[\n\r\t\\]/.test(value);
    if (needsQuotes) {
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      return `"${escapedValue}"`;
    }
    return value;
  }
  return String(value);
};

const isUniformObjectArray = (arr: any[]): boolean => {
    // Must have at least one item to determine the structure.
    if (arr.length < 1) return false;
    
    const firstItem = arr[0];
    // All items must be non-null objects (and not arrays).
    if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) {
        return false;
    }

    const firstKeys = Object.keys(firstItem).sort();
    // Objects must have keys to be considered for tabular format.
    if (firstKeys.length === 0) return false; 

    // Check all other items in the array.
    return arr.every(item => {
        // Ensure item is a valid object with the same structure.
        if (typeof item !== 'object' || item === null || Array.isArray(item)) return false;
        
        const currentKeys = Object.keys(item).sort();
        if (currentKeys.length !== firstKeys.length) return false;
        
        // Compare keys to ensure they are identical.
        return currentKeys.every((key, i) => key === firstKeys[i]);
    });
};


const formatRowValue = (value: any): string => {
    if (isPrimitive(value)) {
        return formatSimpleValue(value);
    }
    // For both arrays and objects, use JSON.stringify for a compact, single-line representation.
    if (typeof value === 'object' && value !== null) {
        const serialized = JSON.stringify(value);
        // Let formatSimpleValue handle quoting if the serialized string contains special characters.
        return formatSimpleValue(serialized);
    }
    return ''; // Should not be reached for valid JSON
}

const isSimpleArray = (arr: any[]): boolean => arr.every(isPrimitive);

const formatValue = (value: any, level: number): string => {
    const indent = '  '.repeat(level);

    if (isPrimitive(value)) return formatSimpleValue(value);

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';
        
        // This is the core logic fix: Use the updated isUniformObjectArray to format correctly.
        if (isUniformObjectArray(value)) {
            const keys = Object.keys(value[0]);
            const header = `{${keys.join(',')}}:`;
            const rows = value.map(item => '  '.repeat(level + 1) + keys.map(k => formatRowValue(item[k])).join(',')).join('\n');
            return `${header}\n${rows}`;
        }

        if (isSimpleArray(value)) {
             return value.map(item => `${indent}- ${formatSimpleValue(item)}`).join('\n');
        }

        // Fallback for non-uniform arrays of objects or mixed arrays.
        return value.map(item => {
            if (isPrimitive(item)) {
                return `${indent}- ${formatSimpleValue(item)}`;
            }
            if (typeof item === 'object' && item !== null) {
                const entries = Object.entries(item);
                if (entries.length === 0) return `${indent}- {}`;

                const nestedContent = entries.map(([key, val]) => {
                    const content = formatValue(val, level + 2);
                    if (Array.isArray(val)) {
                        if (val.length === 0) return `  ${key}[]:`;
                        return `  ${key}[${val.length}]:\n${content}`;
                    }
                    if (typeof val === 'object' && val !== null) {
                        return `  ${key}:\n${content}`;
                    }
                    return `  ${key}: ${formatSimpleValue(val)}`;
                }).join('\n');
                
                return `${indent}- ${nestedContent.trimStart()}`;
            }
            return ''; // Should not happen
        }).join('\n');
    }

    if (typeof value === 'object' && value !== null) {
        const entries = Object.entries(value);
        if (entries.length === 0) return '{}';

        return entries.map(([key, val]) => {
            if (Array.isArray(val)) {
                if (isUniformObjectArray(val)) {
                    const keys = Object.keys(val[0]);
                    const header = `${key}[${val.length}]{${keys.join(',')}}:`;
                    const rows = val.map(item => '  '.repeat(level + 1) + keys.map(k => formatRowValue(item[k])).join(',')).join('\n');
                    return `${indent}${header}\n${rows}`;
                }
                if (isSimpleArray(val)) {
                    const items = val.map(formatSimpleValue).join(',');
                    if (val.length === 0) return `${indent}${key}[]:`;
                    return `${indent}${key}[${val.length}]: ${items}`;
                }
                const header = `${key}[${val.length}]:`;
                const content = formatValue(val, level + 1);
                return `${indent}${header}\n${content}`;
            }

            if (typeof val === 'object' && val !== null) {
                const content = formatValue(val, level + 1);
                 if (content === '{}') return `${indent}${key}: {}`
                return `${indent}${key}:\n${content}`;
            }

            return `${indent}${key}: ${formatSimpleValue(val)}`;
        }).join('\n');
    }
    
    return ''; // Fallback
};

export const convertJsonToToon = (jsonString: string): string => {
  if (!jsonString.trim()) {
    return '';
  }
  try {
    const data = JSON.parse(jsonString);
    // Handle case where top-level is a uniform array of objects
    if (Array.isArray(data) && isUniformObjectArray(data)) {
        return formatValue(data, -1); // Start level at -1 to get correct indentation
    }
    return formatValue(data, 0);
  } catch (error) {
    if (error instanceof SyntaxError) {
      const message = error.message.replace('JSON.parse: ', '');
      throw new Error(`Invalid JSON: ${message}`);
    }
    throw new Error('An unexpected error occurred during conversion.');
  }
};
