const csvWriter = require("csv-write-stream")
const fs = require("fs")
const {
    faker
} = require("@faker-js/faker")
process.title = "A_write_csv"
const write = async () => {
    const writer = csvWriter()
    let num = 10000000
    let count = 0;
    writer.pipe(fs.createWriteStream('out.csv'))
    for (let i = 0; i < num; i++) {
        let user = {
            id: i + 1,
            name: faker.name.fullName(),
            email: faker.internet.email()
        }
        await new Promise((resolve) => {
            writer.write(user, null, (err) => {
                if (err) {
                    console.error(err);
                    process.exit()
                }
                resolve()
            })
        })
        // count++
        // if (count > 100000) {
        //     await new Promise(resolve => {
        //         setTimeout(resolve, 1000 * 4)
        //     })
        //     count = 0
        // }
    }
    writer.end()

}

write()