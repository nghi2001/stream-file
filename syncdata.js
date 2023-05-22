const main = async () => {
    const {
        faker
    } = require('@faker-js/faker');
    const fs = require('fs');
    process.title = "A_test_writefile"
    let writeStream = fs.createWriteStream('data.json', {});
    let data = "["
    let num = 1000000
    writeStream.on("finish", () => {
        console.log("wrote data to file");
    })

    writeStream.write(data)
    let write = async (data) => {
        await new Promise((resolve, reject) => {
            writeStream.write(data, (err) => {
                resolve()
            })
        })
        return 0
    }
    for (let i = 0; i < num; i++) {
        let user = {
            id: i + 1,
            name: faker.name.fullName(),
            email: faker.internet.email()
        }
        user = JSON.stringify(user)
        if (i != num - 1) {
            user += ","
        }
        await write(user)
    }
    data = "]"
    writeStream.write(data)
    writeStream.end(() => {
        console.log("End");
    })
}
main()