import React from 'react'
import { Icon,
          Button,
          Dropdown,
          Divider,
          Segment, 
          Modal,
          Container ,
          Table, 
          Pagination} from 'semantic-ui-react'
import firebase from '../config/firebase.js'
import Header from '../components/Header'

const regex = new RegExp('^[a-zA-Z0-9 ]+$')
class Users extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      profiles: [],
      totalCount: 0,
      filter: '',
      filterValid: true,
      open: false,
    }
  }


componentDidMount() {
    this.getArticles()
}
  

getArticles = () => {
  let profileRef = firebase.database().ref('profile/')
  profileRef.on('value', (snapshot) => {
      const profiles = snapshot.val()
        let newState = []
        for (let profile in profiles) {

          newState.push ({
            id: profile,
            name: profiles[profile].fullName,
            bio: profiles[profile].bio,
            sellerScore: profiles[profile].sellerScore,
            verificationScore: profiles[profile].verificationScore,
  
          })

        }
        this.setState({
          profiles: newState,
          totalCount : newState.length,
        })
        console.log('DATA RETRIEVED'); 

    })
}

show = size => () => this.setState({ size, open: true })
close = () => this.setState({ open: false })


handleRemoveArticle(articleId) {
  let rmArticleRef = firebase.database().ref('articles/'+articleId)
  console.log(rmArticleRef + ' Will be deleted')
  //rmArticleRef.remove()
}


updateSingleData(email){
  
}


render() {
  const {profiles,  totalCount ,open, size} = this.state
  let index = 0
  let profileId = ''
    return (
      <div className = 'shopContainer'>
        <Header pageTitle = 'Users'/>
        <Container>
        <Segment>
       Total Count : {totalCount}
       <Divider />
    <Table celled selectable sortable>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Bio</Table.HeaderCell>
              <Table.HeaderCell>Seller Score</Table.HeaderCell>
              <Table.HeaderCell>Verification Score</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {profiles.map((profile) => {
              profileId = profile.id
              return (
                <Table.Row>
                  <Table.Cell>{index++}</Table.Cell>
                <Table.Cell>{profile.name}</Table.Cell>
                <Table.Cell>{profile.bio}</Table.Cell>
                <Table.Cell>{profile.sellerScore}</Table.Cell>
                <Table.Cell>{profile.verificationScore}</Table.Cell>
                <Table.Cell textAlign="center">
                <Dropdown  pointing='left' icon= 'sliders horizontal'>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                        text='Delete'
                        onClick={this.show('small')} />
                    <Dropdown.Item 
                        text='Archive'
                        onClick={() => this.updateSingleData('inverted')} />
                    <Dropdown.Item 
                        text='Go to user'
                        onClick={() => this.updateSingleData('inverted')} />
                </Dropdown.Menu>
            </Dropdown>
                </Table.Cell>
              </Table.Row>
              )
            })}
            <Modal size={size} open={open} onClose={this.close}>
                          <Modal.Header>Delete this article</Modal.Header>
                          <Modal.Content>
                            <p>Are you sure you want to delete this article</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button onClick={this.close} negative>
                              No
                              </Button>
                            <Button 
                            {...console.log(profileId)}
                            onSubmit={this.handleRemoveArticle(profileId)}
                            positive 
                            icon='checkmark' 
                            labelPosition='right' 
                            content='Yes' />
                          </Modal.Actions>
                        </Modal>
          </Table.Body>

          <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="8">
                  <Pagination
                    defaultActivePage={5}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={10}
                  />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
         </Table>
        </Segment>
        </Container>
      </div>

    )

  }
}

export default Users;