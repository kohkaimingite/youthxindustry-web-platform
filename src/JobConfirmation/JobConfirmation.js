import React, { useState } from "react";
import emailjs from '@emailjs/browser';

export default function jobConfirmation () {
    
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_nqak4rb', 'template_ej4c4sk', e.target, 'EOze04zGTBzzoGFXp')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    };

    return (
        <form onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>OppID</label>
            <input type="text" name="user_OppID" />
            <label>job title</label>
            <input type="text" name="user_JT" />
            <label>Company</label>
            <input name="text" name="Company"/>
            <input type="submit" value="Send" />
        </form>
    );
};