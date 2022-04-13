const fs = require('fs').promises
const xlsx = require('xlsx')
const reader = async() => {
  const directory = await fs.readdir('./colocarArquivoAqui',() => {})
  directory.map(async(e) => {
    let text = ''
    let counter = 0
    const filePath = `./colocarArquivoAqui/${e}`
    const file = await fs.readFile(filePath, 'utf-8')
    file.split('\n').map((ele, i, alle) => {
      const resto = Math.ceil(alle.length / 3000)
      text =`${ele}\n${text}\n`
      if( i > 0  && i % 3000  === 0){
        counter = counter + 1
        fs.writeFile(`./ArquivoSeparado/${e}${counter}.csv`, text)
        text = ''
      }
      if(i === alle.length - 1){
        fs.writeFile(`./ArquivoSeparado/${e}${counter + 1}.csv`, text)
      }
    })
  })
}
reader()