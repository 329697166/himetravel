define(function() {
    var proNav;
    proNav = avalon.define({
        $id: 'proNav',
        nav: [
            {className: "b-icon b-icon-aircraft", link: "#!/airportTransfer", content: "接送机", active: true},
            {className: "b-icon b-icon-car", link: "#!/car", content: "专车专导", active: false},
            {className: "b-icon b-icon-carpool", link: "#!/carpool", content: "结伴拼车", active: false},
            {className: "b-icon b-icon-pedestrianism", link: "#!/pedestrianism", content: "徒步陪游", active: false},
            {className: "b-icon b-icon-climbing", link: "#!/climbing", content: "特色游玩", active: false},
            {className: "b-icon b-icon-map", link: "#!/classical", content: "经典行程", active: false}
        ]
    });
    return proNav;
})