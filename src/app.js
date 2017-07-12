/*

const openStream = require('./openStream');
const Peer = require('simple-peer');
const $ = require('jquery');
const playVideo = require('./playVideo')


openStream(function(stream){
				playVideo(stream,'localstream');
				const p = new Peer({initiator: location.hash==='#1', trickle:false, stream  });

				p.on('signal',token => {
					$('#txtMySignal').val(JSON.stringify(token))
				});

				p.on('stream', st=>{
					playVideo(st,'friendstream');
				})

				$('#btnConnect').click(()=>{
					const friendSignal = JSON.parse($('#txtFriendSignal').val());
					p.signal(friendSignal);
				})
});

console.log("Xin chao cac ban");

// p.on('connect',()=>{
				// 	console.log('Connected');
				// 	setInterval(()=>{p.send(Math.random())},2000 );
				// });

				// p.on('data',(data)=>{
				// 	console.log("Nhan du lieu "+data);
				// })


*/

const Peer = require('peerjs');
const uid = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo')


function getPeer(){
	const id= uid(10);
	$('#peer-id').append(id);
	return id;
}

let customConfig;

  $.ajax ({
             url: "https://global.xirsys.net/_turn/rtc/",
             type: "PUT",
             async: false,
             headers: {
               "Authorization": "Basic " + btoa("untilu29:8496ff92-63c9-11e7-8a18-547e37216ee4")
             },
             success: function (res){
               // console.log("ICE List: "+res.v.iceServers);
               console.log('res',res);
             customConfig= res.v;
             }
         });

const connectObj = {host:'streamlmc.herokuapp.com', port: 443, secure: true, key: 'peerjs', config:customConfig};


const peer = Peer(getPeer(),connectObj);


$('#btnCall').click(()=>{
	const friendId = $('#txtFriendId').val();
	openStream(stream=>{
		playVideo(stream,'localstream');
		const call= peer.call(friendId, stream);
		call.on('stream', remoteStream=> playVideo(remoteStream,'friendstream'));
	});
})


peer.on('call', (call)=> {
	console.log('vao dc call');
	openStream(stream=>{
		// console.log(stream);
		    playVideo(stream,'localstream');
    		call.answer(stream); // Answer the call with an A/V stream. 
    		call.on('stream', remoteStream=> {
    			playVideo(remoteStream,'friendstream')
    		});
	});
});
