// las cookies son middleware

// seria la ruta mas el middleware cookies

cartRouter.get("/set", (req, res) => {
    const {cookies} = req
    res.cookie('nombre', 'aaron'),
    res.status.json({
        message: 'cookies seteada', 
        sucess: true
    })
})

router.get('/clearCookie', (req, res) => {
    const { cookies } = req
    res.clearCookie('nombre'),
    res.status().json({
        message: 'cookies borradas'
    })
})