import { definitions, type Service } from './tools.js';
const examples: Record<string, { name: string; arguments: Record<string, unknown> }> = {
  "lookup_dns": {
    "name": "lookup_dns",
    "arguments": {
      "domain": "example.com",
      "type": "A"
    }
  },
  "check_email_dns": {
    "name": "check_email_dns",
    "arguments": {
      "domain": "example.com"
    }
  },
  "check_https": {
    "name": "check_https",
    "arguments": {
      "domain": "example.com"
    }
  },
  "deployment_readiness": {
    "name": "deployment_readiness",
    "arguments": {
      "domain": "example.com"
    }
  },
  "trace_email": {
    "name": "trace_email",
    "arguments": {
      "headers": "Received: from sender.example by mx.example; Fri, 09 Oct 2026 10:00:00 +0000",
      "deliveryLog": "450 4.2.0 temporary deferral"
    }
  },
  "parse_logs": {
    "name": "parse_logs",
    "arguments": {
      "text": "{\"level\":\"ERROR\",\"timestamp\":\"2026-10-09T10:00:00Z\",\"message\":\"example\"}",
      "format": "auto"
    }
  },
  "summarize_logs": {
    "name": "summarize_logs",
    "arguments": {
      "text": "Oct  9 10:00:00 router process: example",
      "format": "rfc3164"
    }
  },
  "extract_ci_failures": {
    "name": "extract_ci_failures",
    "arguments": {
      "text": "src/app.ts(2,1): error TS2322: type mismatch"
    }
  },
  "analyze_http_trace": {
    "name": "analyze_http_trace",
    "arguments": {
      "entries": [
        {
          "method": "GET",
          "url": "https://example.com/",
          "status": 429,
          "responseHeaders": {
            "Retry-After": "60"
          }
        }
      ]
    }
  },
  "validate_config": {
    "name": "validate_config",
    "arguments": {
      "text": "{\"port\":443}",
      "schema": {
        "type": "object",
        "required": [
          "port"
        ],
        "properties": {
          "port": {
            "type": "integer",
            "minimum": 1,
            "maximum": 65535
          }
        },
        "additionalProperties": false
      }
    }
  },
  "inspect_subnet": {
    "name": "inspect_subnet",
    "arguments": {
      "cidr": "192.0.2.1/24"
    }
  },
  "plan_subnets": {
    "name": "plan_subnets",
    "arguments": {
      "parent": "2001:db8::/48",
      "requests": [
        {
          "label": "office",
          "prefix": 64
        }
      ]
    }
  },
  "check_cidr_overlap": {
    "name": "check_cidr_overlap",
    "arguments": {
      "cidrs": [
        "192.0.2.0/24",
        "192.0.2.128/25"
      ]
    }
  }
};
// Never serialize Zod messages, values, dynamic keys, or full issue paths.
export function validationHelp(service: Service, tool: string, issues: readonly { code: string; path: PropertyKey[] }[] = []) {
  const known = Object.hasOwn(definitions[service], tool);
  const selected = known ? tool : Object.keys(definitions[service])[0];
  const fields = known ? Object.keys(definitions[service][tool].schema.shape) : [];
  const hints: Record<string, string> = {
    invalid_type: 'Supply the required field with the type shown in tools/list.',
    invalid_value: 'Use one of the allowed values shown in tools/list; values are case-sensitive.',
    unrecognized_keys: 'Remove extra keys. Only the keys in tools/list are accepted.',
    too_small: 'The value is below the minimum size or bound shown in tools/list.',
    too_big: 'The value exceeds the maximum size or bound shown in tools/list.'
  };
  return {
    reason: known ? 'invalid_arguments' : 'unknown_tool_for_endpoint',
    guidance: 'Call tools/list on this endpoint. Use the exact tool name and argument schema. Correct the request before retrying.',
    issues: issues.slice(0, 8).map(issue => ({
      field: typeof issue.path[0] === 'string' && fields.includes(issue.path[0]) ? issue.path[0] : 'arguments',
      guidance: hints[issue.code] || 'Check this argument against the schema returned by tools/list.'
    })),
    omittedIssues: Math.max(0, issues.length - 8),
    availableTools: Object.keys(definitions[service]),
    example: { method: 'tools/call', params: examples[selected] }
  };
}
