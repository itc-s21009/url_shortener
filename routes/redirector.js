const express = require('express')
const {prisma} = require("./index");
const router = express.Router()

router.get('/:alias', async (req, res) => {
    const alias = req.params.alias
    await prisma.link.findFirst({
        where: {
            alias: alias
        }
    }).then(r => {
        if (r !== null) {
            res.redirect(r.to)
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router