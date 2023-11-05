import smtplib
import random

class email_api:
    def send_email(self, receiver):
        random_number = random.randint(0, 5)

        email = 'eamondevh@gmail.com'
        receiver_email = receiver

        
        subject = self.get_subject(random_number)
        message = self.get_message(random_number)

        text = f"Subject: {subject}\n\n{message}"

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(email, "wpgwqkpwxbciffhs")
        server.sendmail(email, receiver_email, text)

        print(f"Email has been sent to {receiver_email}")

    def get_subject(self, num):
        subjects = ['Subject: Urgent Action Required - Verify Your Bank Account',
                    'Exciting Campus Job Offer - Make $400/week for 4 hours of work!',
                    'Hi: Elon Musk here and in need of your help!',
                    'Good Student Deal! Free Chegg and Fortnite V-Bucks!',
                    "Kevin O'leary wants to help you!",
                    'Important: Chase Account Breached']
        return subjects[num]

    def get_message(self, num):
        messages = ['Dear Valued Customer, \nWe have detected unusual activity on your bank account.'
                    + 'Please click the link below to verify your account information and prevent any unauthorized access. '
                    + 'https://spudmelf.github.io/',
                    'Hello students, \nMy lab is looking for quality research assistants.'
                    + 'Please click the link below to access the application (only open to UTD undergraduate students). '
                    + 'https://spudmelf.github.io/',
                    'Hello good sir, \n Yes, it is really me Elon Musk I have become stranded on Mars and I need you to help send gold for my rescue'
                    +'Please click on this link to find my buried treasure which will help bring me home:  https://spudmelf.github.io/'
                    +'I will reward you handsomely, so chop chop!',
                    'Good to see you valued student,\n I am very glad to hear you are exicted in our free chegg and fortnite v-bucks!'
                    +'In order to confirm your order please select the link here and you will be well on your way to a great semester: '
                    +'https://spudmelf.github.io/',
                    'Hello my fellow entrepreneurs!\n It is me Shark Tank\'s wonderful Mr. Wonderful, and guess what: I want to work with you!'
                    +'I have a 12 week $1200 intensive training program, and once you complete it I will invest in your company!'
                    +'Please access the program here: https://spudmelf.github.io/',
                    'Important: \n To whomever it may concern the Chase account registered with this email has been compromised and the money '
                    +'is now at risk of being lost.  In order to stop this transaction from proceeding please click on this link '
                    +'to halt and freeze your account and hereby void the transaction: https://spudmelf.github.io/']
        
        return messages[num]





        

"""
def main():
    email = email_api()
    email.send_email("eamonhurleyjobs@gmail.com")
if __name__ == "__main__":
    main()
"""
