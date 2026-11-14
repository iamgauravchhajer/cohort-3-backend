import { ChatCohere } from "@langchain/cohere";
import dotEnv from "dotenv"; 
import { CohereEmbeddings } from '@langchain/cohere';  
import { Pinecone } from "@pinecone-database/pinecone";   
import { HumanMessage, ToolMessage } from "@langchain/core/messages";
dotEnv.config()

const userInput = "what was aarav suggested during his job by his senior?"

const embeddings = new CohereEmbeddings({
    model: 'embed-v5.0-fast',
    apiKey: process.env.COHERE_API_KEY
})

const vector = await embeddings.embedQuery(userInput)

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const index = pc.Index({
    name: "cohort-rag",
    host: "https://cohort-rag-cc4848r.svc.aped-4627-b74a.pinecone.io"
});

const result = await index.documents.search({
    topK: 3,
    scoreBy: [
        {
            type: 'dense_vector',
            field: 'embedding',
            values: vector,
            
        }
    ],
    includeFields: ['content']
})

const model = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: process.env.COHERE_API_KEY
})

const messages = []

messages.push(new HumanMessage(userInput))

messages.push(new ToolMessage({
    content: JSON.stringify(result)
}))

async function main() {
    const response = await model.invoke(messages)
    console.log(response.text)
}

main()