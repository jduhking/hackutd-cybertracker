
interface PhishingEmails {
    id: string;
    email: string;
    date: string;
}

interface Props {

    listOfPhishingEmails?: Array<PhishingEmails> 
}



const Phishing: React.FC<Props> = ({ listOfPhishingEmails }) => {

    return (<>
        {
            listOfPhishingEmails ? listOfPhishingEmails.map((phishEmail, index) => {
              const divClassName = index === 0 ? 'firstBadSite' : 'badSite';

              return (
                <div className={divClassName}>
                  <p className="badSiteUrl">{phishEmail.email}</p>
                  <p className="badSiteDate">{phishEmail.date}</p>
                </div>
              )
            }) : <div>You have not clicked on any phishing emails</div>
        }
    </>)

}

export default Phishing;