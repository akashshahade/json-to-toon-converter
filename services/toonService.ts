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
    if (arr.length < 1) return false;
    const firstItem = arr[0];
    if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) return false;
    const firstKeys = Object.keys(firstItem).sort();
    if (firstKeys.length === 0) return false; 
    for (const key of firstKeys) {
        if (!isPrimitive(firstItem[key])) return false;
    }
    return arr.every(item => {
        if (typeof item !== 'object' || item === null || Array.isArray(item)) return false;
        const currentKeys = Object.keys(item).sort();
        if (currentKeys.length !== firstKeys.length || !currentKeys.every((key, i) => key === firstKeys[i])) return false;
        for (const key of currentKeys) {
            if (!isPrimitive(item[key])) return false;
        }
        return true;
    });
};

const isSimpleArray = (arr: any[]): boolean => arr.every(isPrimitive);

const formatValue = (value: any, level: number): string => {
    const indent = '  '.repeat(level);

    if (isPrimitive(value)) return formatSimpleValue(value);

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]';

        return value.map(item => {
            if (isPrimitive(item)) {
                return `${indent}- ${formatSimpleValue(item)}`;
            }
            // For objects or nested arrays in a list
            if (typeof item === 'object' && item !== null) {
                const entries = Object.entries(item);
                if (entries.length === 0) return `${indent}- {}`;

                return entries.map(([key, val], index) => {
                    const prefix = (index === 0) ? '- ' : '  ';
                    const lineIndent = `${indent}${prefix}`;
                    const content = formatValue(val, level + 2); // Indent nested content further
                    
                    if (Array.isArray(val)) {
                        return `${lineIndent}${key}[${val.length}]:\n${content}`;
                    }
                    if (typeof val === 'object' && val !== null) {
                        return `${lineIndent}${key}:\n${content}`;
                    }
                    return `${lineIndent}${key}: ${formatSimpleValue(val)}`;
                }).join('\n');
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
                    const rows = val.map(item => '  '.repeat(level + 1) + keys.map(k => formatSimpleValue(item[k])).join(',')).join('\n');
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
    return formatValue(data, 0);
  } catch (error) {
    if (error instanceof SyntaxError) {
      const message = error.message.replace('JSON.parse: ', '');
      throw new Error(`Invalid JSON: ${message}`);
    }
    throw new Error('An unexpected error occurred during conversion.');
  }
};