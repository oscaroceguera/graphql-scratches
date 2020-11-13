import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Query query={gql`
      {
        characters {
          results {
            id
            name
          }
        }
      }
    `}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error :(</p>

        return data.characters.results.map(character => (
        <p>{character.name}</p>
        ))
      }}
    </Query>
  );
}

export default App;
