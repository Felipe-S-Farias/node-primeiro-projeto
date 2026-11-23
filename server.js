import express from 'express'
import { PrismaClient } from './generated/prisma/client.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient();

app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    console.log(user)

    res.status(201).json(user)
})

app.put('/usuarios/:id', async (req, res) => {

    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    console.log(user)

    res.status(200).json(user)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado com sucesso" })

})

app.listen(3000)


//sfariasfelipe_db_user
//idR1F8VebHMOEe1O


/* ,
  "allowScripts": {
    "@prisma/engines@6.19.3": true,
    "prisma@6.19.3": true,
    "@prisma/client@6.19.3": true,
    "dotenv@16.6.1": true,
    "dotenv@18.0.10": true
  } */


    //npm run dev -- rodar servidor
    //npx prisma studio -- rodar prisma
