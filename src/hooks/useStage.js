import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = () => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            const newstage = prevStage.map(row => {
                row.map(cell => ())
            })
        }
        setStage(prev => updateStage(prev));
    }, [])

    return [stage, setStage];
}