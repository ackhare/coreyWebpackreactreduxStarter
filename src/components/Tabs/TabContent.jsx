import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class TabContent extends React.Component
{
  state = {
    editorState: EditorState.createEmpty(),
  }
  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        {this.props.activeTab.name === 'Author Profile' ?
        <section className="panel panel-success">
          <h2 className="panel-heading">Content 1</h2>
          <p className="panel-body">Bacon ham hock kevin boudin rump leberkas. Spare ribs kielbasa shankle hamburger tongue jerky pork chop bresaola. Shoulder pork belly short loin strip steak prosciutto frankfurter. Beef kevin t-bone venison pork belly meatball chuck short loin bresaola doner picanha. Cupim short ribs short loin brisket bacon rump porchetta venison t-bone drumstick pork chop hamburger meatball. Pork loin frankfurter shankle pork picanha pastrami. Pork loin pancetta venison short loin frankfurter.</p>
          <p className="panel-body">Shoulder doner swine ball tip venison porchetta. Capicola beef meatball, tri-tip strip steak kevin jowl cupim venison. Tongue fatback ribeye leberkas biltong t-bone. Pancetta frankfurter meatloaf, pig t-bone picanha ham fatback chicken drumstick short loin cupim short ribs cow. Beef short ribs ribeye meatball filet mignon andouille frankfurter swine turducken bresaola spare ribs cupim picanha cow. Drumstick tenderloin ham hock shoulder ground round, beef strip steak flank. Salami rump beef ground round.</p>
         </section>
        :null}
        {/* {this.props.activeTab.name === 'Tab 2' ?
        <section className="panel panel-warning">
          <h2 className="panel-heading">Content 2</h2>
          <p className="panel-body">Atlantic herring jellynose fish Siamese fighting fish pollock: cobbler snakehead sea raven! Freshwater shark sergeant major clingfish sweeper galjoen fish mudfish longjaw mudsucker. Death Valley pupfish pomfret electric ray zingel African glass catfish squawfish yellowtail snapper grunt sculpin.</p>
          <p className="panel-body">Pike ribbon sawtail fish common tunny, yellowfin grouper pearl perch mooneye three-toothed puffer Bengal danio. Black sea bass turbot, "madtom swallower northern anchovy Red whalefish; Redhorse sucker." Filefish yellow jack Japanese eel longfin smelt stargazer saury yellow weaver flounder white croaker pink salmon. Pacific herring, whiff pink salmon jack wallago! Yellow jack alfonsino pike chubsucker, yellowtail collared dogfish rivuline tailor eelblenny silver carp; smalltooth sawfish--sea chub powen giant gourami. Inconnu false trevally pompano, half-gill roundhead black dragonfish damselfish: king of herring.</p>
        </section>
        :null}
        {this.props.activeTab.name === 'Tab 3' ?
        <section className="panel panel-success">
          <h2 className="panel-heading">About Page</h2>
          <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        /> */}
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
          </section>
        :null}
      </div>
    );
  }
};

export default TabContent;
