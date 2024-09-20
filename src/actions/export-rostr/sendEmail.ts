'use server'

import { ReactNode } from 'react';
import resend from '@/lib/resend';

interface SendEmailProps {
    from: string;
    to: string[];
    subject: string;
    text: string;
    react: ReactNode;
}

export default async function sendEmail(sendEmailProps: SendEmailProps) {
    const { from, to, subject, text, react } = sendEmailProps;
    try {
        const response = await resend.emails.send({
          from: from,
          to: to,
          subject: subject,
          text: text,
          react: react,
        });

        if(!response.error){
            return {success: true, data: response.data}
        }
        
        return {success: false, error: response.error};
    }
    catch (error) {
        return {success: false, error};
    }
}