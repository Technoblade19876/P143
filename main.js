song1 = "";
song2 = "";

leftWrist_y = "";
leftWrist_x = "";
rightWrist_y = "";
rightWrist_x = "";

leftWrist_score = 0;
status = "";


function preload(){
    song1 = loadSound("Wellerman_song2.mp3");
    song2 = loadSound("Metamorphosis_song1.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    circle(leftWrist_x, leftWrist_y, 15);
    circle(rightWrist_x, rightWrist_y, 15);

    status = song1.isPlaying();
    console.log(status);

    if(leftWrist_score > 0.2){
        song1.play();
    }

}

function song1play(){
    song1.play();
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;

        console.log(rightWrist_x, rightWrist_y);
        console.log(leftWrist_x, leftWrist_y);
        
        leftWrist_score =  results[0].pose.keypoints[9];
        console.log(leftWrist_score);
     }

}

function modelLoaded(){
    console.log("model loaded");
    }