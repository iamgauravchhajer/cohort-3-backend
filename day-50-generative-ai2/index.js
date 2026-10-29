import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv'
import rl from "readline/promises"

dotenv.config()

let messages = []

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY
});

while (true) {
    const userInput = await readline.question("enter your question: ")

    messages.push({role: "user", content: userInput})
    // const response = await model.invoke(userInput)
    const stream = await model.stream(messages)

    let aiMessage = ""
    for await (const chunk of stream){
        aiMessage += chunk.content
        process.stdout.write(chunk.content)
    }

    messages.push({role: "assistant", content: aiMessage})
    console.log()
}

