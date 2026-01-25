const assaultRifle = Object.freeze({
  "A01"	: "M15 MOD 0",
  "A02"	: "AK-27",
  "A03"	: "MXR-17",
  "A04"	: "X9 Maverick",
  "A05"	: "DS20 Mirage",
  "A06"	: "Peacekeeper MK1",
  "A11"	: "Maddox RFB"
});
const submachinegun = Object.freeze({
  "S01" :	"Ryden 45K",
  "S02" :	"RK-9",
  "S03"	: "Razor 9mm",
  "S04"	: "Dravec 45",
  "S05"	: "Carbon 57",
  "S06"	: "MPC-25",
  "S07"	: "Sturmwolf 45",
  "S10"	: "Kogot-7"
});
const shotgun = Object.freeze({
  "C01" :	"M10 Breacher",
  "C02" :	"Echo 12",
  "C03" :	"Akita"
});
const lightmachinegun = Object.freeze({
  "L01"	: "MK.78",
  "L02" :	"XM325",
  "L04"	: "Sokol 545"
});
const marksmanRifle = Object.freeze({
  "M01" :	"M8A1",
  "M02"	: "Warden 308",
  "M03"	: "M34 Novaline"
});
const sniper = Object.freeze({
  "R01" :	"VS Recon",
  "R02"	: "Shadow SK",
  "R03" :	"XR-3 Ion",
  "R05" :	"Hawker HX"
});
const pistol = Object.freeze({
  "P01"	: "Jäger 45",
  "P02"	: "Velox 5.7",
  "P03"	: "Coda 9"
});
const specialW = Object.freeze({
  "U01" :	"NX Ravager"
});
const categoryMap = Object.freeze({
  "ASSAULT RIFLES" : "A",
  "SUBMACHINE GUNS" : "S",
  "SHOTGUNS" : "C",
  "LIGHT MACHINE GUNS" : "L",
  "MARKSMAN RIFLES" : "M",
  "SNIPER RIFLES" : "R",
  "PISTOLS" : "P"
});

const optic = Object.freeze({
  "5XGZH-JLU91-1" : "",
  "8E7Z8-TX9D1-1" : "",
  "AUXYZ-48NH1-1" : "",
  "DBNYQ-DJ3L1-1" : "",   
  "FSEYG-MUHQ1-1" : "",
  "I95Y7-X5WU1-1" : "",
  "KPVXY-7GBY1-1" : "",
  "N6LXP-GRR31-1" : "",
  "QMCXF-R3671-1" : "",
  "T43X7-1DKB1-1" : "",
  "VJTWX-ANZF1-1" : "",
  "Y1JWN-JZEJ1-1" : "",
  "21HAW-EUATN-11" : "",
  "23Y1W-64L8S-11" : "", 
  "26ERV-WDWMW-11" : "",
  "28VHV-MN831-11" : "",
  "2BC8V-DXIH5-11" : "",
  "2DSYV-57TW9-11" : "",
  "2G9PU-VH5BD-11" : "",
  "2IQFU-LRFQH-11" : "",
  "2L76U-D1R5L-11" : "",
  "2NMWU-4B2JQ-11" : "",
  "2R4MT-UKCYU-11" : "",
  "2TKDT-KUNDY-11" : "",
  "2W24T-C4YT3-11" : "",
  "2YHUT-3EA87-11" : "",
  "31YKS-TNKMB-11" : ""
});
const muzzle = Object.freeze({
  "2KD5Y-11" : "",
  "45QAW-11" : "",
  "5Q3FU-11" : "",
  "7AFKS-11" : "",
  "8USQQ-11" : "",
  "AF5VN-11" : ""
});
const barrel = Object.freeze({
  "H11" : "",
  "Q11" : "",
  "Y11" : "",
  "2711" : "",
  "2F11" : "",
  "2N11" : ""
});
const underbarrel = Object.freeze({
  "2E9ZS-TS11" : "",
  "3SIZK-MJ11" : "",
  "56SZD-GB11" : "",
  "6K2Z6-A311" : "",
  "7YBYY-3U11" : "",
  "9CKYQ-WL11" : ""
});
const launchers = Object.freeze({
  "AA942-62863-11" : "",
  "JJH73-B3FB5-11" : "",
  "TTQA4-G4MG7-11" : "",
  "243YD-5L5UL-911" : "",
  "2DD7G-6R72R-B11" : ""
});
const magazine = Object.freeze({
  "2S911" : "",
  "4JH11" : "",
  "6BQ11" : "",
  "83Y11" : "",
  "9V711" : "",
  "BMF11" : ""
});
const reargrip = Object.freeze({
  "6WVQL-H11" : "",
  "9VBKW-Q11" : "",
  "CTRG7-Y11" : "",
  "FS7BI-711" : "",
  "IQM6T-F11" : "",
  "LP324-N11" : "",
  "PMHWE-W11" : "",
  "SKXRQ-511" : "",
  "VJDM1-D11" : "",
  "YHTHB-L11" : ""
});
const stock = Object.freeze({
  "4S11" : "",
  "8J11" : "", 
  "CB11" : "",
  "G311" : "",
  "JU11" : "",
  "NL11" : "",
  "SD11" : "",
  "W511" : ""
});
const laser = Object.freeze({
  "3LYXL-H9Y11" : "",
  "68XV7-YIW11" : "",
  "8UWST-FSU11" : "",
  "BGVQE-X2S11" : "",
  "E3UN1-EBQ11" : "",
  "GPTKL-VKN11" : "",
  "JBSI8-CUL11" : "",
  "LXRFT-U4J11" : "",
  "PJQDF-BDH11" : ""
});
const firemods = Object.freeze({
  "131" : "",
  "151" : ""
});
const ammomod = Object.freeze({
  "21WSG-FBYJX-2J11" : "",
  "2JD6P-5HFUD-KB11" : "",
  "32TJW-UMX4U-4311" : "",
  "3K9Y5-JTEEA-LU11" : "",
  "43QCD-9YVNR-5L11" : ""
});
const special = Object.freeze({
  "UCS11" : "",
  "2NPJ1-1" : ""
});

function customAddMultiple(...inputs) {
    if (inputs.length === 0) return '';

    const charset = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ"; //Base34 1-9 A-Z without O but 1 has value 0
    const baseValue = charset.length;

    const charToIndex = {};
    const indexToChar = {};

    for (let i = 0; i < charset.length; i++) {
        charToIndex[charset[i]] = i;
        indexToChar[i] = charset[i];
    }
    charToIndex['1'] = 0; // 1 = 0

    const maxLength = Math.max(...inputs.map(s => s.length));
    const padded = inputs.map(s => s.padStart(maxLength, '1'));

    let carry = 0;
    let result = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = carry;
        for (const str of padded) {
            sum += charToIndex[str[i]] || 0; // Treat empty or invalid chars as 0
        }
        const digit = sum % baseValue;
        carry = Math.floor(sum / baseValue);
        result = indexToChar[digit] + result;
    }

    while (carry > 0) {
        const digit = carry % baseValue;
        carry = Math.floor(carry / baseValue);
        result = indexToChar[digit] + result;
    }

    return result;
}

function calculate() {
    const values = [
        document.getElementById('optic').value,
        document.getElementById('muzzle').value,
        document.getElementById('barrel').value,
        document.getElementById('underbarrel').value,
        document.getElementById('magazine').value,
        document.getElementById('rearGrip').value,
        document.getElementById('stock').value,
        document.getElementById('laser').value,
        document.getElementById('fireMods').value
    ];
     for (let i = 0; i < values.length; i++) {
        values[i] = values[i].replace(/-/g, '');
    }

    const result = customAddMultiple(...values);
    document.getElementById('result').innerText = "Result: " + result.match(/.{1,5}/g).join('-');
}