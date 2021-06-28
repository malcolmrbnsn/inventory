const {boxAssignedEmail} = require("./mail");
const {Seller} = require("../models")

async function giga() {
    let seller = await Seller.findOne({name: "malcolm"});
boxAssignedEmail(seller)
}

giga()