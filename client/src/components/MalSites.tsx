
interface BadSite {
    id: string;
    url: string;
    date: string;
  }

interface Props {

    listOfBadSites: Array<BadSite> | undefined
}



const MalSites: React.FC<Props> = ({ listOfBadSites }) => {

    return (<>
        {
            listOfBadSites ? listOfBadSites.map((badSite, index) => {
              const divClassName = index === 0 ? 'firstBadSite' : 'badSite';

              return (
                <div className={divClassName}>
                  <p className="badSiteUrl">{badSite.url}</p>
                  <p className="badSiteDate">{badSite.date}</p>
                </div>
              )
            }) : <div>You have not visited any malicious sites</div>
        }
    </>)

}

export default MalSites;