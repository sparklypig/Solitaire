import process from 'process'

// Function to handle entering raw mode and running function on keypresses
// controls is a object dictionary that maps keys to functions
// dispBuff is a flag to enable displaying each buffer
// dflt is a function that runs for every keypress
export default function rawControl(controls, dispBuff = false, dflt = null) {
    process.stdin.setRawMode(true)
    process.stdin.resume()

    process.stdin.on('data', (data) => {

        let flag = dispBuff
        for(const key in controls) {
            if (data.compare(Buffer.from(key, 'hex')) === 0){
                controls[key]()
                flag = false
            }
        }
        if(flag) {
            console.log(data)
        }


        if(data.compare(Buffer.from('03', 'hex')) === 0) {
            console.log('Quit')

            process.stdin.setRawMode(false)
            process.exit()
        }

        if(dflt !== null) {
            dflt()
        }
    })
}