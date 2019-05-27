import React from 'react';
import { render, getByTestId, act, fireEvent } from 'react-testing-library';
import Form from './Form';
import { trafficMeisterClient } from '../helpers';

describe('Form', () => {
    const clientSpy = jest.spyOn(trafficMeisterClient, 'fetchData');
    const mockedList = [{
        type: 'car',
        brand: 'Bugatti Veyron',
        colors: ['red', 'black'],
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg'
    }];

    let formWrapper;

    beforeEach(() => {
        act(() => {
            clientSpy.mockResolvedValue(mockedList);
            formWrapper = render(<Form
                title="This is the test!"
                getImage={img => console.log(img)}
                setData={data => console.log(data)}
                setError={something => console.log(something)} />);
        });

    });

    it('should actually render', () => {
        expect(formWrapper.container).toMatchSnapshot();
    })

    it('should try to retrieve data on load', () => {
        expect(clientSpy).toHaveBeenCalled();
    });

    it('should get one type of vehicle', () => {
        const typeSelect = getByTestId(formWrapper.container, 'type-select');
        expect(typeSelect.childNodes.length).toEqual(2);
    });

    it('should call the API again in case the first call fails', () => {
        clientSpy.mockRejectedValueOnce({
            error: "some weird error"
        });

        render(<Form title="This is the test!" />);

        //5 because it's called once per each test, and twice here.
        expect(clientSpy).toHaveBeenCalledTimes(5);
    });

});