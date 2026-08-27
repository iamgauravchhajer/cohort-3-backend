import { useForm } from 'react-hook-form'
import axios from 'axios'

const App = () => {
  const { register, handleSubmit } = useForm()

  const submitHandler = async (data) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('email', data.email)
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i])
    }
    
    const response = await axios.post('http://localhost:3000/api/v1/user/create', formData)
    console.log(response.data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <input {...register('name')} type="text" placeholder="Enter your name" />
      <input {...register('email')} type="email" placeholder="Enter your email" />
      <input {...register('images')} type="file" multiple={true} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default App

