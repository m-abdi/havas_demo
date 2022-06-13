import NewRole from './NewRole';
import Providers from '../StoriesDecorator';
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
      viweTag: true,
      viewLicense: true,
      viewEquipmentAndAsset: true,
      viewPerson: false,
      viewPlace: true,
      createTag: true,
      createEquipmentAndAsset: true,
      createLicense: true,
      createPerson: true,
      createPlace: true,
      editPerson: true,
      editPlace: true,
      editTag: true,
      editLicense: true,
      editEquipmentAndAsset: true,
      deleteLicense: true,
      deletePlace: true,
      deletePerson: true,
      deleteEquipmentAndAsset: true,
      deleteTag: true,
    });
  });
});
