const obj = {
    // PASTE OBJECT BLOCK
}

const allValues = []
let itemCount = 0
let translatedArray = []

// Translate object values to target lan
const translate = async (array, target) => {
    let translatedArray = []

    try {
        const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${YOUR GOOGLE TRANSLATE API KEY}=${target}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "q": array
            })
        })

        const data = await res.json()

        data.data.translations.forEach(item => {
            translatedArray.push(item.translatedText)
        })
    } catch (err) {
        console.log("ERROR OCCURRED: Might be for empty object or object sizes exceed translate limit")
    }

    return translatedArray
}

// Extract all values from nested objects
const convertObjValueToArray = (obj) => {
    Object.keys(obj).forEach(function (key) {
        const obj2 = obj[key];

        if (typeof obj2 === 'object') {
            convertObjValueToArray(obj2)
        } else {
            allValues.push(obj[key])
        }
    });
}

// Get all the values of objects, pass values to translate
const translateObj = async (lan) => {
    convertObjValueToArray(obj)

    translatedArray = await translate(allValues, lan)

    convertArrayToObjValues(obj)

    console.log(JSON.stringify(obj))
}

// Get translated array and replace object values to newly array items
const convertArrayToObjValues = (obj) => {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object') {
            const newObj = obj[key]
            convertArrayToObjValues(newObj)
        } else {
            obj[key] = translatedArray[itemCount]
            itemCount += 1
        }
    });
}

// TODO: Change language code
translateObj('sr').then(r => {
})



