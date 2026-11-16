import { MCPAdapter } from '@langchain/mcp-adapters';

const adapter = new MCPAdapter({
    servers: {
        // Local MCP server
        calender: {
            command: 'node',
            args: ['../mcp-server/server.js']
        },
        // Remote MCP Server
        docs: {
            url: 'https://docs.langchain.com/mcp'
        }
    }
})

const tools = await adapter.listTools()
console.log("Available Tools", tools)