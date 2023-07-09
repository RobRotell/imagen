import { Configuration, OpenAIApi } from 'openai'


const openAiConfig = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

const openAiClient = new OpenAIApi( openAiConfig )


export class OpenAi {



}
