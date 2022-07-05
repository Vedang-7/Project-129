music_1="";
music_2="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
score_left_wrist=0;
score_right_wrist=0;
music_1_status="";
music_2_status="";
function preload(){
    music_1= loadSound("music.mp3");
    music_2= loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(500, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left_wrist=results[0].pose.keypoints[9].score;
        score_right_wrist=results[0].pose.keypoints[10].score;
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("left_wrist_x ="+left_wrist_x+"Left_wrist_y"+left_wrist_y);
        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("right_wrist_x ="+right_wrist_x+"right_wrist_y"+right_wrist_y);
    }
   }
function draw(){
    image(video, 0, 0, 500, 380);
    music_1_status=music_1.isPlaying();
    music_2_status=music_2.isPlaying();
    fill("red");
    stroke("red");
if(score_right_wrist>0.2){    
    circle(right_wrist_x, right_wrist_y, 20);
    music_2.stop();
    if(music_1_status==false){
        music_1.play();
        document.getElementById("start").innerHTML="Playing: Harry Potter Theme Song";
    }
}
if(score_left_wrist>0.2){
    circle(left_wrist_x, left_wrist_y, 20);
    music_1.stop();
    if(music_2_status==false){
        music_2.play();
        document.getElementById("start").innerHTML="Playing: Peter Pan Song";
    }
}
}
function play(){
    if(right_wrist_y>2){
        music_1.play();
        song.setVolume(1);
        song.rate(1);
    }
    else{
     music_2.play();
     song.setVolume(1);
     song.rate(1); 
    }
}   