import {Category, CategoryProperties} from "./category";
import {omit} from 'lodash';
import {validate as uuidValidate} from 'uuid';

describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    let category = new Category({ name: 'Movie' });
    let props = omit(category.props, 'created_at');
    let created_at = new Date();

    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({ name: 'Movie', description: 'some description', is_active: false, created_at: created_at });
    expect(category.props).toStrictEqual(
      {
        name: 'Movie',
        description: 'some description',
        is_active: false,
        created_at: created_at
      }
    );

    category = new Category({ name: 'Movie', description: 'other description'});
    expect(category.props).toMatchObject(
      {
        name: 'Movie',
        description: 'other description'
      }
    );

    category = new Category({ name: 'Movie', is_active: true});
    expect(category.props).toMatchObject(
      {
        name: 'Movie',
        is_active: true
      }
    );

    created_at = new Date();
    category = new Category({ name: 'Movie', created_at: created_at});
    expect(category.props).toMatchObject(
      {
        name: 'Movie',
        created_at: created_at
      }
    );
  })

  test('id prop', () => {
    type CategoryData = { props: CategoryProperties, id?: string }
    const data: CategoryData[] = [
      {props: {name: 'Movie'}},
      {props: {name: 'Movie'}, id: null},
      {props: {name: 'Movie'}, id: undefined},
      {props: {name: 'Movie'}, id: 'be145867-3880-4e36-80a1-e8b967b6a35d'},
    ];

    data.forEach(i => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
    })
  })

  test('getter of name props', () => {
    const category = new Category({ name: 'Movie' })
    expect(category.name).toBe('Movie');
  })

  test('getter and setter of description props', () => {
    let category = new Category({ name: 'Movie', description: 'some description' })
    expect(category.description).toBe('some description');

    category = new Category({ name: 'Movie' })
    expect(category.description).toBeNull();

    category = new Category({ name: 'Movie' })
    category['description'] = 'other description';
    expect(category.description). toBe('other description');

    category['description'] = undefined;
    expect(category.description). toBeNull();

    category['description'] = null;
    expect(category.description). toBeNull();
  })

  test('getter and setter of is_active prop', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: 'Movie', is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: 'Movie', is_active: false });
    expect(category.is_active).toBeFalsy();
  })

  test('getter of created_at prop', () => {
    const created_at = new Date();
    let category = new Category({ name: 'Movie', created_at });
    expect(category.created_at).toBe(created_at);

    category = new Category({ name: 'Movie' });
    expect(category.created_at).toBeInstanceOf(Date);
  })
});