import {Button} from "../../src/Components/Button"
import Providers from "../../src/Components/StoriesDecorator"
describe('ComponentName.cy.ts', () => {
  it('playground', () => {
    cy.mount(
      <Providers>
        <Button label='ارسال' />
      </Providers>
    );
    cy.get("button").click()
    cy.get('button').should('contain.text', 'ارسال');
  })
})