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

class Categories extends React.Component {

  constructor (props){
    super(props)
    this.state = {
      categories: [],
      totalCount: 0,
      filter: '',
      filterValid: true,
      open: false,
    }
  }


componentDidMount() {
    this.getCategories()
}
  
destroyCategory(categoryId) {
  // firebase.database().ref('categories/'+categoryId)
  //   .update({
  //           articlesNumber: 'null',
  //           name: 'null',
  //           iconUrl: 'null'
  // })
}

getCategories = () => {
  let categoriesRef = firebase.database().ref('categories/')
  categoriesRef.on('value', (snapshot) => {
      const categories = snapshot.val()
        let newState = []
        for (let categorie in categories) {

          newState.push ({
            id: categorie,
            name: categories[categorie].name,
            articlesNumber: categories[categorie].articlesNumber,
          })

        }
        this.setState({
          categories: newState,
          totalCount : newState.length,
        })
        console.log('DATA RETRIEVED'); 

    })
}



show = size => () => this.setState({ size, open: true })
close = () => this.setState({ open: false })

render() {
  const {categories , totalCount ,open, size} = this.state
  let index = 0
    return (
      <div className = 'shopContainer'>
        <Header pageTitle = 'Categories'/>
        <Container>
        <Segment>

       Total Count : {totalCount}
       <Button floated='right' primary href="/createcategory" >Create new</Button>
       <br/><br/>
       <Divider />
    <Table celled selectable sortable>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Articles Number</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {categories.map((categorie) => {
              return (
                <Table.Row>
                  <Table.Cell>{index++}</Table.Cell>
                <Table.Cell>{categorie.name}</Table.Cell>
                <Table.Cell>{categorie.articlesNumber}</Table.Cell>
                <Table.Cell textAlign="center">
                <Dropdown  pointing='left' icon= 'sliders horizontal'>
                  <Dropdown.Menu>
                    <Dropdown.Item 
                        text='Delete'
                        onClick={this.show('small')} />
                        <Modal size={size} open={open} onClose={this.close}>
                          <Modal.Header>Delete this categorie</Modal.Header>
                          <Modal.Content>
                            <p>Are you sure you want to delete this categorie</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button onClick={this.close} negative>
                              No
                              </Button>
                            <Button 
                            onSubmit={this.destroyCategory(categorie.id)}
                            positive 
                            icon='checkmark' 
                            labelPosition='right' 
                            content='Yes' />
                          </Modal.Actions>
                        </Modal>
               
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

export default Categories;