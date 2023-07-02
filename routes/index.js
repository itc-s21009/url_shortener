var express = require('express');
const {PrismaClient} = require("@prisma/client");
var router = express.Router();
const prisma = new PrismaClient()
const crypto = require('crypto')

const generateRandomStr = (N) => crypto.randomBytes(N).toString('base64').substring(0, N)

const trimLastSlashes = (s) => {
    for (let i = s.length - 1; i > 0; i--) {
        if (s[i] !== '/') {
            return s.slice(0, i + 1)
        }
    }
}

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', async (req, res) => {
    let {text} = req.body
    text = trimLastSlashes(text)
    await prisma.link.findFirst({
        where: {
            to: text
        }
    }).then(async r => {
        if (r !== null) {
            const url = `${req.hostname}/${r.alias}`
            res.send(url)
        } else {
            const alias = generateRandomStr(6)
            await prisma.link.create({
                data: {
                    alias: alias,
                    to: text
                }
            })
            const url = `${req.hostname}/${alias}`
            res.send(url)
        }
    })
})

module.exports = {router, prisma};
