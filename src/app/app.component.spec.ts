import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  it('should render title', async () => {
    await render(AppComponent, {
      imports: [AppModule],
      excludeComponentDeclaration: true,
      routes: [],
    });

    expect(screen.getByRole('heading')).toHaveTextContent(/todos app/i);
  });
});
