// JavaScript source code
import axios from 'axios';
import React,{Component} from 'react'; 
class App extends Component {
    return(
    <input type = "file" onchange = "readFile(this)" >

            <script>
                function readFile(input) {
                    let file = input.files[0];

                let reader = new FileReader();

                reader.readAsText(file);

                reader.onload = function() {
                    console.log(reader.result);
  };

                reader.onerror = function() {
                    console.log(reader.error);
  };

}
            </script>
    }
  export default App; 