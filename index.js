const { createCompletion, loadModel } = require('gpt4all');

const retrieveTinyAI = async (name) => {
  const ai = await fetch(`https://plugin.tinyai.id/get?name=${name}`).then(res => res.json());
  return ai;
}

const start = async (name, message) => {
  const model = await loadModel('mistral-7b-openorca.Q4_0.gguf', { verbose: true });

  const ai = await retrieveTinyAI(name);

  const response = await createCompletion(model, [
    { role: 'system', content: ai.systemPrompt },
    { role: "assistant", content: ai.systemKnowledge },
    { role: 'user', content: message }
  ]);

  return response;
}


start('cagatay', 'Who is Cagatay?').then(console.log);
// {
//   "llmodel": "mistral-7b-openorca.Q4_0.gguf",
//     "usage": {
//     "prompt_tokens": 86,
//       "completion_tokens": 340,
//         "total_tokens": 426
//   },
//   "choices": [
//     {
//       "message": {
//         "role": "assistant",
//         "content": " Cagatay is a professional services company that provides innovative solutions and high-quality support in various fields, including software development, IT consulting, digital marketing, and more. They have been operating since 2015 and are dedicated to helping businesses grow by offering tailored services based on their clients' needs."
//       }
//     }
//   ]
// }