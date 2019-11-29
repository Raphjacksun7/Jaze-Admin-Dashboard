import React from 'react';
import { Icon,
        Button,
        Form,
        Divider,
        Segment, 
        Select,
        Container ,
        Message, 
        Pagination} from 'semantic-ui-react' 
import firebase from '../config/firebase.js'
import Header from '../components/Header';

const iconOptions = [
  { key: 'af', value: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Boss-3-512.png', text: 'Jobs & Services' },
  { key: 'ax', value: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Old-Car-2-512.png', text: 'Voitures' },
  { key: 'am', value: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Apartment-512.png', text: 'Maison' },
  { key: 'al', value: 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Battery-Charging-512.png', text: 'Electroniques' },
  { key: 'ae', value: 'https://img.icons8.com/flat_round/64/000000/lizard.png', text: 'Animals' },
  { key: 'ad', value: 'https://img.icons8.com/flat_round/64/000000/star--v3.png', text: 'Divers' },
]

class CreateCategory extends React.Component {

    constructor (props){
      super(props)
      this.state = {
        iconName: '',
        selectOption: '',
        target: '',
      }

    this.handleSubmit = this.handleSubmit.bind(this);
    }
    
      handleSubmit() {
        console.log(this.state.iconName, this.state.selectOption)
        this.addCategory(this.state.iconName, this.state.selectOption)
      }

      
    addCategory(iconName,iconUrl) {
      
        if( iconName != '' && iconUrl != '' ) {
          firebase.database().ref('categories/').push({
            articlesNumber: 0,
            name: iconName,
            iconUrl: iconUrl
        }).then(() => {
          this.setState({target: 'success'})
            console.log('Data is saved!');
            alert("Vous avez ajoutez un nouvel categorie")
            
        }).catch((e) => {
           this.setState({target: 'error'})
            console.log('Failed.', e);
        })
      }else {
          this.setState({target: 'error'})
      }
    }
    
    
      updateCategory(categoryId , name) {
        
      }
    
 
    render() {
        const { target } = this.state
          return (
            <div className = 'shopContainer'>
                <Header pageTitle = 'Create New Category'/>
                    <Container>
                    <br/><br/><br/><br/>
                        <Segment padded>
                        <Form
                            {...target}
                            onSubmit={this.handleSubmit}>
                            <Form.Group widths={2}>
                            <Form.Input 
                                required
                                onChange={(e , { value }) =>  this.setState({iconName: value})} 
                                label='Category name'
                                placeholder='Category name' />

                            <Form.Field 
                                required
                                onChange={(e, { value }) => this.setState({selectOption: value}) }
                                control={Select} 
                                options={iconOptions}
                                label={{ children: 'Icon Type', htmlFor: 'form-select-control-icon' }}
                                placeholder='Icon Type'
                                search
                                searchInput={{ id: 'form-select-control-icon' }} />
                            </Form.Group>
                            <Message success header='Succes !' content="An category ha been added." />
                            <Message error header='Error !' content='An error was appear please try again with a right input.'/>
                            <Button 
                                required
                                positive
                                type='submit'
                                >Submit</Button>
                        </Form>
                        </Segment>
                    </Container>
            </div>
          )}
}  

export default  CreateCategory