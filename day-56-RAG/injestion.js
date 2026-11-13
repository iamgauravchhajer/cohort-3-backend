import { PDFParse } from 'pdf-parse'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CohereEmbeddings } from '@langchain/cohere';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config()

const parser = new PDFParse({
    data: await fs.readFile("./story.pdf")
})

const textResult = await parser.getText()

const splitter = new RecursiveCharacterTextSplitter({ 
    chunkSize: 500, 
    chunkOverlap: 100 
})

const chunks = await splitter.splitText(textResult.text)

const embeddings = new CohereEmbeddings({
    model: 'embed-v5.0-fast',
    apiKey: process.env.COHERE_API_KEY
})

const vectors = await embeddings.embedDocuments(chunks)

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

const index = pc.Index({
    name: "cohort-rag",
    host: "https://cohort-rag-cc4848r.svc.aped-4627-b74a.pinecone.io"
});

await index.documents.upsert({
    documents: vectors.map((vector, index) => {
        return {
            _id: `chunk-${index}`,
            embedding: vector,
            content: chunks[index]
        }
    })
})

console.log(`Upserted ${vectors.length} documents into Pinecone.`)