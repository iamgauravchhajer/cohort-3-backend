import { tool, createAgent } from 'langchain'
import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv'
import rl from "readline/promises"
import { z } from 'zod'
import { StateGraph, START, END } from '@langchain/langgraph'

dotenv.config()

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
});

async function LLMNode(state) {
    console.log(state);
    return {
        messages: [
            ...state.messages,
            {
                role: "assistant",
                content: "Hello world!"
            }
        ]
    }
}

const graph = new StateGraph(
    z.object({ messages: z.array(z.any()) })
)
    .addNode("LLMNode", LLMNode)
    .addEdge(START, "LLMNode")
    .addEdge("LLMNode", END)
    .compile()


const graphResult = await graph.invoke({
    messages: [
        {
            role: "user",
            content: "Hello World!"
        }
    ]
})

console.log('graph:', graphResult)
