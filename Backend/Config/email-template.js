module.exports = {
    
  
    register: (name,otp) => ({
        subject: `Hii ${name} Otp for registration is: `,
        html: "<h3>OTP for account verification is ( Confirm before 3 min before expire) </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" ,
        
    }),
    feedback:(description,senderemail)=>({
        subject: `hii admin `,
        html:"<h3>U received One feedback from</h3>"+"<h3>"+senderemail+"</h3>"+"<h2>users problem is = "+description+"</h2>"
    })

}