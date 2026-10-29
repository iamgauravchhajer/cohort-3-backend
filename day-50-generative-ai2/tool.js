import { tool, createAgent } from 'langchain'
import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv'
import rl from "readline/promises"
import { z } from 'zod'

dotenv.config()

const events = []

const createEventTool = tool(
    async function ({ date, title, description }) {
        console.log('creating event...', { date, title, description })
        events.push({ date, title, description })
        return "event created"
    },
    {
        name: "createEvent",
        description: "Create a new event",
        schema: z.object({
            date: z.string(),
            title: z.string(),
            description: z.string()
        })
    }
)

const getEventTool = tool(
    async function ({ }) {
        console.log('fetching events...')
        return events
    },
    {
        name: 'getEvents',
        description: 'Get all events',
        schema: z.object({})
    }
)

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
});

const agent = createAgent({
    model,
    tools: [createEventTool, getEventTool]
})

while (true) {
    const userInput = await readline.question('enter your question: ')

    const stream = await agent.stream({
        messages: [
            {
                role: "user",
                content: userInput
            }
        ]
    }, {
        streamMode: 'messages'
    })

    for await (const [chunk] of stream) {
        process.stdout.write(chunk.content)
    }
    console.log()
}

