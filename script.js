import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWOF32bHq6Y3gtsMsloI2CzHHSmc2T1d0",
    authDomain: "office-of-emergent-pract-874dd.firebaseapp.com",
    projectId: "office-of-emergent-pract-874dd",
    storageBucket: "office-of-emergent-pract-874dd.appspot.com",
    messagingSenderId: "577295365681",
    appId: "1:577295365681:web:1f306ec5d05479c6b30710",
    measurementId: "G-GRPGGTKKRH"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//creat class for stack to store prev image
class prevImageStorageStack {
    constructor() {
        this.imageIdArray = [];
    }

    push(imageId) {
        this.imageIdArray.push(imageId);
    }

    pop() {
        return this.imageIdArray.pop();
    }

    peek() {
        return this.imageIdArray[this.imageIdArray.length - 1];
    }

    isEmpty() {
        return this.imageIdArray.length == 0;
    }
}


const rightButton = document.getElementById("right-button");
const rightLowerButton = document.getElementById("right-lower-button");
const leftButton = document.getElementById("left-button");
const leftLowerButton = document.getElementById("left-lower-button");
const db = getFirestore(app);
var tempImageId;
var prevImageObject = new prevImageStorageStack();

//length of collections
const docRefLength = doc(db, "Length", "imagesCollectionCount");
const docSnapLength = await getDoc(docRefLength);
var imagesCollectionCount = docSnapLength.data().count;

//display first image
var imageId = randomNumberGenerator();
const docRef = doc(db, "Images", imageId.toString());
const docSnap = await getDoc(docRef);
var srcData = docSnap.data();
document.getElementById("hero-image").src = srcData.image;
tempImageId = imageId;
prevImageObject.push(imageId);

//on click next image
rightButton.addEventListener("click", function () {
    tempImageId = imageId;
    while (imageId == tempImageId) imageId = randomNumberGenerator();
    displayImage(imageId);
    prevImageObject.push(imageId);
});

rightLowerButton.addEventListener("click", function () {
    tempImageId = imageId;
    while (imageId == tempImageId) imageId = randomNumberGenerator();
    displayImage(imageId);
    prevImageObject.push(imageId);
});

//on click prev image
leftButton.addEventListener("click", function () {
    if (prevImageObject.imageIdArray.length == 0 || prevImageObject.imageIdArray.length == 1) {
        while (tempImageId == imageId)
            imageId = randomNumberGenerator();
        displayImage(imageId);
        tempImageId = imageId;
    }
    else {
        prevImageObject.pop();
        imageId = prevImageObject.peek();
        tempImageId = prevImageObject.peek();
        displayImage(imageId);
    }
});

leftLowerButton.addEventListener("click", function () {
    if (prevImageObject.imageIdArray.length == 0 || prevImageObject.imageIdArray.length == 1) {
        while (tempImageId == imageId)
            imageId = randomNumberGenerator();
        displayImage(imageId);
        tempImageId = imageId;
    }
    else {
        prevImageObject.pop();
        imageId = prevImageObject.peek();
        tempImageId = prevImageObject.peek();
        displayImage(imageId);
    }
});


function randomNumberGenerator() {
    return Math.floor((Math.random() * imagesCollectionCount) + 1);
}

async function displayImage(imageId) {
    document.getElementById("hero-image").src = "";
    const docRef = doc(db, "Images", imageId.toString());
    const docSnap = await getDoc(docRef);
    var srcData = docSnap.data();
    var image = srcData.image;
    document.getElementById("hero-image").src = image;
}
