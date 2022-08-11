import NewRole from './NewRole';
import Providers from '../../../StoriesDecorator';
describe('NewRole.cy.tsx', () => {
  it('changes role name correctly', () => {
    cy.mount(<NewRole onSubmit={async(name: string, permissions: any) => true} />);
    cy.get("input[type='text']").type('انباردار');
    cy.get("input[type='text']").should('have.value', 'انباردار');
  });
  it('submits properly', () => {
    const onSubmitSpy = cy.spy().as('onSubmitSpy');
    cy.mount(
      <Providers>
        <NewRole onSubmit={onSubmitSpy} />
      </Providers>,
      {
        props: { onSubmit: onSubmitSpy },
      }
    );
    cy.get("input[type='text']").type('انباردار');
    cy.get("input[type='text']").should('have.value', 'انباردار');
    cy.get('span').contains('مشاهده اشخاص').click();
    cy.get("input[type='checkbox']").click({ multiple: true });
    cy.get('button#submit').click();
    cy.get('@onSubmitSpy').should('have.been.calledWith', 'انباردار', {
      viewPerson: false,
      createPerson: true,
      editPerson: true,
      deletePerson: true,
      viewPlace: true,
      createPlace: true,
      editPlace: true,
      deletePlace: true,
      viewEquipment: true,
      createEquipment: true,
      editEquipment: true,
      deleteEquipment: true,
      viewAsset: true,
      createAsset: true,
      editAsset: true,
      deleteAsset: true,
      viewLicense: true,
      createLicense: true,
      editLicense: true,
      deleteLicense: true,
      viewTag: true,
      createTag: true,
      editTag: true,
      deleteTag: true,
      viewRole: true,
      createRole: true,
      editRole: true,
      deleteRole: true,
    });
  });
});
