const firebaseConfig={apiKey:"AIzaSyAdJZlbzyA6ssJu5YyvftEupGIKlAQSPAI",authDomain:"simulator-299fa.firebaseapp.com",databaseURL:"https://simulator-299fa.firebaseio.com",projectId:"simulator-299fa",storageBucket:"simulator-299fa.appspot.com",messagingSenderId:"966834241777",appId:"1:966834241777:web:082d59532e859be085e950",measurementId:"G-NJ3L8JQKES"};firebase.initializeApp(firebaseConfig);var name,email,photoUrl,uid,emailVerified,connected=!0,user=firebase.auth().currentUser,ui=new firebaseui.auth.AuthUI(firebase.auth()),actionCodeSettings={url:"https://simulator.whoz.io/"},uiConfig={callbacks:{signInSuccessWithAuthResult:function(){return document.getElementById("esn-main").style.display="block",console.log("ici",document.getElementById("whozup-description")),document.getElementById("whozup-description").style.display="none",connected=!0,user=firebase.auth().currentUser,null!=user&&(name=user.displayName,email=user.email,photoUrl=user.photoURL,emailVerified=user.emailVerified,uid=user.uid),db.collection("whoz"+dev).doc(email).collection("login").add({email:email,loginId,loginDate}),db.collection("events"+dev).add({type:"login",email:email,loginId,loginDate}),saveSimulation1(),!1},uiShown:function(){document.getElementById("loader").style.display="none"}},signInFlow:"popup",signInSuccessUrl:"",signInOptions:[{provider:firebase.auth.EmailAuthProvider.PROVIDER_ID,signInMethod:firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD},firebase.auth.GoogleAuthProvider.PROVIDER_ID],tosUrl:"<your-tos-url>",privacyPolicyUrl:"<your-privacy-policy-url>"},dev="";ui.start("#firebaseui-auth-container",uiConfig);var defaultDatabase=firebase.database(),db=firebase.firestore(),loginId=+new Date,loginDate=new Date;db.collection("view"+dev).add({loginId,loginDate});var variableTitleList=[{name:"nbDays",type:"number",initialValue:218,optim:!1},{name:"nbConsultant",type:"number",initialValue:75,optim:!1},{name:"TJM",type:"number",initialValue:550,optim:!1},{name:"margin",type:"percent",initialValue:.22,optim:!1},{name:"ratioHires",type:"percent",initialValue:.15,optim:!1},{name:"ratioLeavers",type:"percent",initialValue:.1,optim:!1},{name:"avgTaskDays",type:"number",initialValue:100,optim:!1},{name:"ratioTaskRenewNum",type:"number",initialValue:2,optim:!1},{name:"ratioTaskRenewDenum",type:"number",initialValue:3,optim:!1},{name:"ratioTaskRenewDuration",type:"percent",initialValue:.5,optim:!1},{name:"avgDaysFirstStaffing",type:"number",initialValue:20,optim:!0,limit:5,limitType:"min"},{name:"taskDelay",type:"number",initialValue:30,optim:!0,limit:5,limitType:"min"},{name:"beginDelayed",type:"number",initialValue:7,optim:!0,limit:2,limitType:"min"},{name:"ratioBeginDelayed",type:"number",initialValue:9,optim:!0,limit:20,limitType:"max"},{name:"endBefore",type:"number",initialValue:10,optim:!0,limit:5,limitType:"min"},{name:"ratioEndBefore",type:"number",initialValue:19,optim:!0,limit:40,limitType:"max"},{name:"ratioShadowStaffing",type:"number",initialValue:30,optim:!0,limit:50,limitType:"max"},{name:"shadowStaffingDuration",type:"number",initialValue:20,optim:!0,limit:0,limitType:"min"}];for(const a in variableTitleList){var currentVariableName=variableTitleList[a].name,currentType=variableTitleList[a].type,i=variableTitleList[a].initialValue;document.getElementById(currentVariableName).value="percent"===currentType?Math.round(100*(100*i))/100:i}var nbDays,nbConsultant,TJM,margin,ratioHires,ratioLeavers,avgDaysFirstStaffing,avgTaskDays,taskDelay,ratioTaskRenewNum,ratioTaskRenewDenum,ratioTaskRenewDuration,ratioBeginDelayed,beginDelayed,ratioEndBefore,endBefore,ratioShadowStaffing,shadowStaffingDuration,nbUA,UAPrice,price;function getVariables(){return nbConsultant=+document.getElementById("nbConsultant").value,nbDays=+document.getElementById("nbDays").value,TJM=+document.getElementById("TJM").value,ratioHires=+document.getElementById("ratioHires").value/100,ratioLeavers=+document.getElementById("ratioLeavers").value/100,avgTaskDays=+document.getElementById("avgTaskDays").value,avgDaysFirstStaffing=+document.getElementById("avgDaysFirstStaffing").value,taskDelay=+document.getElementById("taskDelay").value,margin=+document.getElementById("margin").value/100,ratioTaskRenewNum=+document.getElementById("ratioTaskRenewNum").value,ratioTaskRenewDenum=+document.getElementById("ratioTaskRenewDenum").value,ratioTaskRenewDuration=+document.getElementById("ratioTaskRenewDuration").value/100,ratioShadowStaffing=+document.getElementById("ratioShadowStaffing").value,shadowStaffingDuration=+document.getElementById("shadowStaffingDuration").value,beginDelayed=+document.getElementById("beginDelayed").value,ratioBeginDelayed=+document.getElementById("ratioBeginDelayed").value,endBefore=+document.getElementById("endBefore").value,ratioEndBefore=+document.getElementById("ratioEndBefore").value,nbUA=+nbConsultant/10,UAPrice=1440*(nbDays/218),price=nbUA*UAPrice,{nbConsultant,nbDays,TJM,ratioHires,ratioLeavers,avgTaskDays,avgDaysFirstStaffing,taskDelay,margin,ratioTaskRenewNum,ratioTaskRenewDenum,ratioTaskRenewDuration,beginDelayed,ratioBeginDelayed,endBefore,ratioEndBefore,ratioShadowStaffing,shadowStaffingDuration,nbUA,UAPrice,price}}function calculateTaskDays(a){var b;return b=1>=a%10&&4>=a%10?avgTaskDays:5==a%10||7==a%10?Math.floor(.8*avgTaskDays):6==a%10||8==a%10?Math.floor(1.2*avgTaskDays):9==a%10?Math.floor(1.5*avgTaskDays):Math.floor(.5*avgTaskDays),tempCurrentTaskDuration=a%ratioTaskRenewDenum>ratioTaskRenewNum-1?b:Math.floor((1+ratioTaskRenewDuration)*b),tempCurrentTaskDuration}function simulate(){var a=getVariables(),b=[],c=Math.floor(ratioHires*nbConsultant),d=Math.floor(ratioLeavers*nbConsultant),e=Math.floor(nbDays/c),f=Math.floor(nbDays/d),g=+nbConsultant+ +c,h=0,i=1,j=0,k=0,l=1,m=0,n=0;for(let a=0;a<g;a++){var o,p;c--;var q=0<=c?e*c:-1,r=nbDays+1;if(g-a<d){d--;var r=0<d?f*d:nbDays}h!==i&&(p=calculateTaskDays(i),h=i),k=a%p,m=k<=beginDelayed?k:beginDelayed;for(let c=1;c<=nbDays;c++){var s,t,p;h!==i&&(p=calculateTaskDays(i),h=i),c<q||c>r?(s=0,t="NOT WORKING"):0<=q&&c>=q&&c-q<avgDaysFirstStaffing?(s=2,t="ON BOARDING"):1<l&&j<taskDelay&&0==k?(j++,s=2,t="DELAY BETWEEN TASKS"):n<shadowStaffingDuration&&0==i%ratioShadowStaffing?(n++,s=2,t="SHADOW STAFFING"):m<beginDelayed&&0==i%ratioBeginDelayed?(m++,s=2,t="START DELAYED"):0==i%ratioEndBefore&&p-k<=endBefore?(s=2,t="END BEFORE",k++):(s=1,t="BILLABLE",k++),b.push({date:c,start:q,end:r,type:t,consultant:a,occupation:s,text:"Task count: "+i+"\nConsultant task count"+l+"\nTask workload: "+k}),k===p&&(i++,l++,j=0,m=0,n=0,k=0)}i++,j=0,m=0,n=0,k=0,l=1,o=a}var u=crossfilter(b),v=u.dimension(function(a){return[+a.date,a.consultant,a]}),w=v.group().reduceSum(function(a){return+a.occupation}),x=13*nbDays,y=13*g,z=new dc.HeatMap("#esnHeatmap");z.width(x).height(y).transitionDuration(0).dimension(v).group(w).keyAccessor(function(a){return+a.key[0]}).valueAccessor(function(a){return+a.key[1]}).rowsLabel(function(a){return"Consultant "+(g-a)}).colsLabel(function(a){return 1==a||a==nbDays||0==a%10?a:""}).title(function(a){return"Date:   "+a.key[0]+"\nConsultant:  "+a.key[1]+"\nType : "+a.key[2].type+"\noccupation: "+a.value+"\nTask : "+a.key[2].text}).colorAccessor(a=>a.key[2].type).colors(d3.scaleOrdinal().domain(["NOT WORKING","ON BOARDING","DELAY BETWEEN TASKS","SHADOW STAFFING","START DELAYED","END BEFORE","BILLABLE"]).range(["#cfcfcf","#935116","#FFBE3E","#c51b8a","#117A65","#CB4335","#0048B5"])),z.margins({top:20,right:0,bottom:20,left:20}),z.on("renderlet",function(a){var b=a.selectAll("rect"),c=1e4,d=1e4;for(let e of b)e.y.baseVal.value<c&&(c=e.y.baseVal.value),e.x.baseVal.value<d&&(d=e.x.baseVal.value);a.selectAll("g.cols.axis > text").attr("y",c-14),a.select("g.heatmap").attr("transform","translate(70, 15)"),a.select("svg").attr("width",x+100).attr("height",y+100)}),z.render(),kpiDim=u.dimension(function(){return 1});var A=kpiDim.groupAll().reduce((a,b)=>(a.numTACE+=1===b.occupation?1:0,a.denumTACE+=1<=b.occupation?1:0,a.interco+=2===b.occupation?1:0,a.missionDelay+="DELAY BETWEEN TASKS"===b.type&&2===b.occupation?1:0,a.onBoarding+="ON BOARDING"===b.type&&2===b.occupation?1:0,a.shadowStaffing+="SHADOW STAFFING"===b.type&&2===b.occupation?1:0,a.leanStart+="START DELAYED"===b.type&&2===b.occupation?1:0,a.leanBack+="END BEFORE"===b.type&&2===b.occupation?1:0,a.TACE=0<a.denumTACE?a.numTACE/a.denumTACE:0,a.CA=a.numTACE*TJM,a.intercoCA=a.interco*TJM,a.intercoCost=a.interco*TJM*(1-margin),a.missionDelayCA=a.missionDelay*TJM,a.missionDelayCost=a.missionDelay*TJM*(1-margin),a.onBoardingCA=a.onBoarding*TJM,a.onBoardingCost=a.onBoarding*TJM*(1-margin),a.shadowStaffingCA=a.shadowStaffing*TJM,a.shadowStaffingCost=a.shadowStaffing*TJM*(1-margin),a.leanStartCA=a.leanStart*TJM,a.leanStartCost=a.leanStart*TJM*(1-margin),a.leanBackCA=a.leanBack*TJM,a.leanBackCost=a.leanBack*TJM*(1-margin),a.totalCost=a.denumTACE*TJM*(1-margin),a.totalTaskCount=i,a.initialConsultant=nbConsultant,a.hires=Math.floor(ratioHires*nbConsultant),a.leavers=Math.floor(ratioLeavers*nbConsultant),a),(a,b)=>(a.numTACE-=1===b.occupation?1:0,a.denumTACE-=1<=b.occupation?1:0,a.interco-=2===b.occupation?1:0,a.missionDelay-="DELAY BETWEEN TASKS"===b.type&&2===b.occupation?1:0,a.onBoarding-="ON BOARDING"===b.type&&2===b.occupation?1:0,a.shadowStaffing-="SHADOW STAFFING"===b.type&&2===b.occupation?1:0,a.leanStart-="START DELAYED"===b.type&&2===b.occupation?1:0,a.leanBack-="END BEFORE"===b.type&&2===b.occupation?1:0,a.TACE=0<a.denumTACE?a.numTACE/a.denumTACE:0,a.CA=a.numTACE*TJM,a.intercoCA=a.interco*TJM,a.intercoCost=a.interco*TJM*(1-margin),a.missionDelayCA=a.missionDelay*TJM,a.missionDelayCost=a.missionDelay*TJM*(1-margin),a.onBoardingCA=a.onBoarding*TJM,a.onBoardingCost=a.onBoarding*TJM*(1-margin),a.shadowStaffingCA=a.shadowStaffing*TJM,a.shadowStaffingCost=a.shadowStaffing*TJM*(1-margin),a.leanStartCA=a.leanStart*TJM,a.leanStartCost=a.leanStart*TJM*(1-margin),a.leanBackCA=a.leanBack*TJM,a.leanBackCost=a.leanBack*TJM*(1-margin),a.totalCost=a.denumTACE*TJM*(1-margin),a.totalTaskCount=i,a.initialConsultant=nbConsultant,a.hires=Math.floor(ratioHires*nbConsultant),a.leavers=Math.floor(ratioLeavers*nbConsultant),a),()=>({numTACE:0,denumTACE:0,TACE:0,interco:0,onBoarding:0,leanStart:0,leanBack:0,CA:0,intercoCA:0,intercoCost:0,missionDelay:0,missionDelayCA:0,missionDelayCost:0,onBoardingCA:0,onBoardingCost:0,leanStartCA:0,leanStartCost:0,leanBackCA:0,leanBackCost:0,shadowStaffing:0,shadowStaffingCA:0,shadowStaffingCost:0,totalCost:0,totalTaskCount:0,initialConsultant:0,hires:0,leavers:0})),B=new dc.NumberDisplay("#esnNumberTACE").formatNumber(d3.format(".2%")).valueAccessor(a=>a.TACE).group(A).render(),C=new dc.NumberDisplay("#esnNumberBillable").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.numTACE).group(A).render(),D=new dc.NumberDisplay("#esnCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.CA).group(A).render(),E=new dc.NumberDisplay("#esnInterco").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.interco).group(A).render(),F=new dc.NumberDisplay("#esnIntercoCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.intercoCA).group(A).render(),G=new dc.NumberDisplay("#esnIntercoCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.intercoCost).group(A).render(),H=new dc.NumberDisplay("#esnMissionDelay").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.missionDelay).group(A).render(),I=new dc.NumberDisplay("#esnMissionDelayCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.missionDelayCA).group(A).render(),J=new dc.NumberDisplay("#esnMissionDelayCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.missionDelayCost).group(A).render(),K=new dc.NumberDisplay("#esnOnBoarding").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.onBoarding).group(A).render(),L=new dc.NumberDisplay("#esnOnBoardingCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.onBoardingCA).group(A).render(),M=new dc.NumberDisplay("#esnOnBoardingCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.onBoardingCost).group(A).render(),N=new dc.NumberDisplay("#esnShadowStaffing").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.shadowStaffing).group(A).render(),O=new dc.NumberDisplay("#esnShadowStaffingCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.shadowStaffingCA).group(A).render(),P=new dc.NumberDisplay("#esnShadowStaffingCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.shadowStaffingCost).group(A).render(),Q=new dc.NumberDisplay("#esnLeanStart").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.leanStart).group(A).render(),O=new dc.NumberDisplay("#esnLeanStartCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.leanStartCA).group(A).render(),P=new dc.NumberDisplay("#esnLeanStartCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.leanStartCost).group(A).render(),R=new dc.NumberDisplay("#esnLeanBack").formatNumber(d3.format(",.0f")).valueAccessor(a=>a.leanBack).group(A).render(),S=new dc.NumberDisplay("#esnLeanBackCA").formatNumber(d3.format(".3s")).valueAccessor(a=>a.leanBackCA).group(A).render(),T=new dc.NumberDisplay("#esnLeanBackCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.leanBackCost).group(A).render(),U=new dc.NumberDisplay("#esnWhozCost").formatNumber(d3.format(".3s")).valueAccessor(()=>price).group(A).render(),T=new dc.NumberDisplay("#esnTotalCost").formatNumber(d3.format(".3s")).valueAccessor(a=>a.totalCost).group(A).render(),V=new dc.NumberDisplay("#esnGlobalMargin").formatNumber(d3.format(".2%")).valueAccessor(a=>(a.CA-a.totalCost)/a.CA).group(A).render(),W=new dc.NumberDisplay("#esnConsultantCount").formatNumber(d3.format(".0f")).valueAccessor(a=>a.initialConsultant-a.leavers+a.hires).group(A).render(),X=new dc.NumberDisplay("#esnMissionCount").formatNumber(d3.format(".3s")).valueAccessor(a=>a.totalTaskCount).group(A).render();return{result:A.value(),variables:a}}var simulation1,simulation2;function saveSimulation1(){connected&&(simulation1=simulate(),document.getElementById("simulationType").textContent="R\xE9f\xE9rence",simulation1&&simulation2?compare("simulation1"):(db.collection("whoz"+dev).doc(user.email).collection("simulate").add({email:user.email,loginId,loginDate,createdAt:firebase.firestore.FieldValue.serverTimestamp(),reference:simulation1}),db.collection("events"+dev).add({type:"simulation1",email:user.email,loginId,loginDate,createdAt:firebase.firestore.FieldValue.serverTimestamp(),reference:simulation1})))}function optim(a,b){for(const c in variableTitleList){var d=variableTitleList[c].optim;if(!0===d){var e=variableTitleList[c].name,f=variableTitleList[c].limitType,g=variableTitleList[c].limit,h=simulation1.variables[e];if("min"===f){var i=Math.max(Math.min(h*(1-a),h),g);document.getElementById(e).value=Math.round("percent"===currentType?100*i:i)}else{var i=Math.min(Math.max(h*(1+a),h),g);document.getElementById(e).value=Math.round("percent"===currentType?100*i:i)}}}saveSimulation2(b)}function optimFast(){optim(.3,"fast")}function optimHard(){optim(.5,"strong")}function saveSimulation2(a){connected&&(simulation2=simulate(),document.getElementById("simulationType").textContent="Cible",simulation1&&simulation2&&compare(a||"compare"))}function compare(a){for(const e in console.log(simulation1,simulation2),variableTitleList){var b=variableTitleList[e].name,c=simulation1.variables[b],d=simulation2.variables[b];document.getElementById(b+"Hint").textContent=c==d?"":"R="+c+" C="+d}const e=document.querySelector(".resultCompare");e.classList.replace("hideCompare","showCompare");var f=crossfilter({id:1}),g=f.dimension(function(a){return a.id}),h=g.groupAll().reduceCount(),i=new dc.NumberDisplay("#compareCA").formatNumber(d3.format("+.3s")).valueAccessor(()=>simulation2.result.CA-simulation1.result.CA).group(h).render(),j=new dc.NumberDisplay("#compareMission").formatNumber(d3.format("+.0f")).valueAccessor(()=>simulation2.result.totalTaskCount-simulation1.result.totalTaskCount).group(h).render(),k=new dc.NumberDisplay("#compareMargin").formatNumber(d3.format("+.2f")).valueAccessor(()=>100*((simulation2.result.CA-simulation2.result.totalCost)/simulation2.result.CA-(simulation1.result.CA-simulation1.result.totalCost)/simulation1.result.CA)).group(h).render(),l=new dc.NumberDisplay("#compareIntercoCost").formatNumber(d3.format("+.3s")).valueAccessor(()=>simulation2.result.intercoCost-simulation1.result.intercoCost).group(h).render();db.collection("whoz"+dev).doc(user.email).collection("compare").add({email:user.email,loginId,loginDate,createdAt:firebase.firestore.FieldValue.serverTimestamp(),reference:simulation1,target:simulation2,from:a}),db.collection("events"+dev).add({type:"compare",from:a,email:user.email,loginId,loginDate,createdAt:firebase.firestore.FieldValue.serverTimestamp(),reference:simulation1,target:simulation2})}
