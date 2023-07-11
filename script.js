const wrapper = document.querySelector(".wrapper"),
generateButton = wrapper.querySelector(".form button"),
qrInput = wrapper.querySelector(".form input"),
qrImg = wrapper.querySelector(".qr-code img"),
downloadButton = wrapper.querySelector(".download button");

let qrValue;

generateButton.addEventListener("click", ()=>{
    qrValue = qrInput.value;
    if(!qrValue) return; // If the input is empty then return from here
    generateButton.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.addEventListener("load", ()=>{
        wrapper.classList.add("active");
        generateButton.innerText = "Generate QR Code";
    })
})

qrInput.addEventListener("keyup", ()=>{
    if(!qrInput.value){
        wrapper.classList.remove("active");
    }
})

downloadButton.addEventListener("click", () => {
    fetch(qrImg.src)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const qrCode = document.createElement("a");
            qrCode.href = url;
            qrCode.download = `${qrValue}.png`;
            qrCode.click();
            qrCode.remove();
            URL.revokeObjectURL(url);
        })
})