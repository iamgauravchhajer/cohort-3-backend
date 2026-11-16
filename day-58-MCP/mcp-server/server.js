import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import * as z from 'zod'

const EVENTS = []

const server = new McpServer({ name: "mcp_server", version: "1.0.0", });

server.registerTool(
    "create_event",
    {
        description: "creates a new calender event",
        inputSchema: z.object({
            title: z.string().describe('title of the event'),
            start: z.string().describe('start date/time of the event'),
            end: z.string().describe('end date/time of the event'),
        }),  
    },
    async ({title , start, end})=>{
        const event = {title, start, end}
        EVENTS.push(event)
        return {
            content: [
                {
                    type: 'text',
                    text: `event ${title} starting at ${start} and ending at ${end} created successfully`
                }
            ]
        }
    },
)

const transport = new StdioServerTransport() // Local Server Communication ✅ | Remote Server Communication ❌
await server.connect(transport)